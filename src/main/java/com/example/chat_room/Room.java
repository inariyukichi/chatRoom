package com.example.chat_room;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// このクラスをDBのエンティティとして定義する
@Entity
public class Room {
    //主キー
    @Id 
    //id番号はDB側で自動付与
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String roomName;

    //DBから読み出すとき値を入れるための空の箱を作成
    public Room(){

    }

    //新規roomを作るときのコンストラクタ
    public Room(String roomName){
        this.roomName = roomName;
    }

    public int getId(){
        return id;
    }

    public String getRoomName(){
        return roomName;
    }

    public void setRoomName(String roomName){
        this.roomName = roomName;
    }
}
