package com.example.chat_room;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

//データを返す窓口　戻り値がそのままJSONデータとして返る
@RestController
// React（localhost:5173）からのアクセスを許可
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {
    //窓口がDB(Repository)を手元に持つための処理

    //Repositoryを保持する
    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    //GET（読み取り）で /api/rooms にアクセスが来たら、このメソッドで答える
    @GetMapping("/api/rooms")
    //List<Room>で返す
    public List<Room> rooms(){
        //findAllでDBのテーブルを全件読む
        return roomRepository.findAll();
    }

    //@Post 新規作成用
    @PostMapping("/api/rooms")
    //@RequestBody Map<String, String> body 
    //      送られてきたJSONをMapの形にして受け取る
    public Room create(@RequestBody Map<String, String> body) {
        //body.get("name") Mapからnameを取得する
        //new Roomで作る　保存するとDBがidを付ける
        Room room = new Room(body.get("name"));
        return roomRepository.save(room);
    }
}
