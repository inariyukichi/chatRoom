package com.example.chat_room;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class roguinn {
    private final MockDatabaseService database;

    public roguinn(MockDatabaseService database) {
        this.database = database;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        boolean authenticated = request != null
                && !isBlank(request.email())
                && !isBlank(request.password())
                && database.authenticateMockUser(request.email(), request.password());
        System.out.println(authenticated);
        return ResponseEntity.ok(new LoginResponse(authenticated));
    }

    @GetMapping("/rooms")
    public List<MockDatabaseService.Room> getRooms(@RequestParam long userId) {
        return database.getRoomsForUser(userId);
    }

    @GetMapping("/rooms/{roomId}/members/{userId}")
    public ResponseEntity<MembershipResponse> checkMembership(
            @PathVariable long roomId,
            @PathVariable long userId) {
        if (!database.roomExists(roomId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(
                new MembershipResponse(roomId, userId, database.isMember(roomId, userId)));
    }

    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<?> getMessages(
            @PathVariable long roomId,
            @RequestParam long userId) {
        if (!database.roomExists(roomId)) {
            return ResponseEntity.notFound().build();
        }
        if (!database.isMember(roomId, userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiMessage("このルームのメンバーではありません。"));
        }
        return ResponseEntity.ok(database.getMessages(roomId));
    }

    @PostMapping("/rooms/{roomId}/messages")
    public ResponseEntity<?> postMessage(
            @PathVariable long roomId,
            @RequestBody CreateMessageRequest request) {
        if (!database.roomExists(roomId)) {
            return ResponseEntity.notFound().build();
        }
        if (request == null || request.userId() == null || isBlank(request.content())) {
            return ResponseEntity.badRequest()
                    .body(new ApiMessage("userIdとメッセージ本文を入力してください。"));
        }
        if (!database.isMember(roomId, request.userId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiMessage("このルームのメンバーではありません。"));
        }
        MockDatabaseService.Message message = database.addMessage(
                roomId, request.userId(), request.content().trim());
        return ResponseEntity.status(HttpStatus.CREATED).body(message);
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    public record LoginRequest(String email, String password) {
    }

    public record LoginResponse(boolean authenticated) {
    }

    public record CreateMessageRequest(Long userId, String content) {
    }

    public record MembershipResponse(long roomId, long userId, boolean member) {
    }

    public record ApiMessage(String message) {
    }
}
