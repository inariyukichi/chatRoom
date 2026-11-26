package com.example.chat_room;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class MockDatabaseService {
    private final List<User> users = new ArrayList<>();
    private final List<Room> rooms = new ArrayList<>();
    private final List<RoomMember> members = new ArrayList<>();
    private final List<Message> messages = new ArrayList<>();
    private long nextMessageId;

    public MockDatabaseService(ObjectMapper objectMapper) throws IOException {
        try (InputStream input = new ClassPathResource("mock-db.json").getInputStream()) {
            JsonNode database = objectMapper.readTree(input);
            readUsers(database.path("users"));
            readRooms(database.path("rooms"));
            readMembers(database.path("room_members"));
            readMessages(database.path("messages"));
        }

        if (rooms.isEmpty()) {
            addSampleRooms();
        }
        if (members.isEmpty()) {
            addSampleMembers();
        }
        if (messages.isEmpty()) {
            addSampleMessages();
        }
        nextMessageId = messages.stream().mapToLong(Message::id).max().orElse(0L) + 1L;
    }

    public synchronized List<Room> getRoomsForUser(long userId) {
        Set<Long> roomIds = members.stream()
                .filter(member -> member.userId() == userId)
                .map(RoomMember::roomId)
                .collect(Collectors.toSet());
        return rooms.stream().filter(room -> roomIds.contains(room.id())).toList();
    }

    public synchronized boolean authenticateMockUser(String email, String password) {
        return users.stream()
                .filter(user -> user.email().equalsIgnoreCase(email))
                .anyMatch(user -> user.passwordHash().equals(password));
    }

    public synchronized boolean roomExists(long roomId) {
        return rooms.stream().anyMatch(room -> room.id() == roomId);
    }

    public synchronized boolean isMember(long roomId, long userId) {
        return members.stream()
                .anyMatch(member -> member.roomId() == roomId && member.userId() == userId);
    }

    public synchronized List<Message> getMessages(long roomId) {
        return messages.stream().filter(message -> message.roomId() == roomId).toList();
    }

    public synchronized Message addMessage(long roomId, long userId, String content) {
        Message message = new Message(nextMessageId++, roomId, userId, content, Instant.now());
        messages.add(message);
        return message;
    }

    private void addSampleRooms() {
        rooms.addAll(List.of(
                new Room(1L, "お知らせ"),
                new Room(2L, "課題相談"),
                new Room(3L, "雑談")));
    }

    private void addSampleMembers() {
        for (Room room : rooms) {
            for (User user : users) {
                members.add(new RoomMember(room.id(), user.id()));
            }
        }
    }

    private void addSampleMessages() {
        if (users.isEmpty() || rooms.isEmpty()) {
            return;
        }
        long firstUserId = users.get(0).id();
        messages.add(new Message(1L, rooms.get(0).id(), firstUserId,
                "このルームの仮メッセージです。", Instant.parse("2026-11-11T09:00:00Z")));
        if (rooms.size() > 1 && users.size() > 1) {
            messages.add(new Message(2L, rooms.get(1).id(), users.get(1).id(),
                    "課題について相談しましょう。", Instant.parse("2026-11-11T09:05:00Z")));
        }
    }

    private void readUsers(JsonNode nodes) throws IOException {
        requireArray(nodes, "users");
        for (JsonNode node : nodes) {
            users.add(new User(
                    requiredLong(node, "id"),
                    requiredText(node, "name"),
                    requiredText(node, "email"),
                    requiredText(node, "password_hash")));
        }
    }

    private void readRooms(JsonNode nodes) throws IOException {
        requireArray(nodes, "rooms");
        for (JsonNode node : nodes) {
            rooms.add(new Room(requiredLong(node, "id"), requiredText(node, "name")));
        }
    }

    private void readMembers(JsonNode nodes) throws IOException {
        requireArray(nodes, "room_members");
        for (JsonNode node : nodes) {
            members.add(new RoomMember(requiredLong(node, "room_id"), requiredLong(node, "user_id")));
        }
    }

    private void readMessages(JsonNode nodes) throws IOException {
        requireArray(nodes, "messages");
        for (JsonNode node : nodes) {
            messages.add(new Message(
                    requiredLong(node, "id"),
                    requiredLong(node, "room_id"),
                    requiredLong(node, "user_id"),
                    requiredText(node, "content"),
                    Instant.parse(requiredText(node, "created_at"))));
        }
    }

    private void requireArray(JsonNode node, String name) throws IOException {
        if (!node.isArray()) {
            throw new IOException("mock-db.json の " + name + " は配列である必要があります。");
        }
    }

    private long requiredLong(JsonNode node, String name) throws IOException {
        JsonNode value = node.get(name);
        if (value == null || !value.canConvertToLong()) {
            throw new IOException("mock-db.json の " + name + " は数値である必要があります。");
        }
        return value.longValue();
    }

    private String requiredText(JsonNode node, String name) throws IOException {
        JsonNode value = node.get(name);
        if (value == null || !value.isTextual() || value.textValue().isBlank()) {
            throw new IOException("mock-db.json の " + name + " は空でない文字列である必要があります。");
        }
        return value.textValue();
    }

    private record User(long id, String name, String email, String passwordHash) {
    }

    public record Room(long id, String name) {
    }

    private record RoomMember(long roomId, long userId) {
    }

    public record Message(long id, long roomId, long userId, String content, Instant createdAt) {
    }
}
