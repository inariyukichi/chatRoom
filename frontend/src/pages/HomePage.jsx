import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
    //useState 画面が覚えておく箱
  const [rooms, setRooms] = useState([]);
  //roomNameは入力欄の文字を入れる箱
  const [roomName, setRoomName] = useState("");

    //一覧を取りに行く関数
  const loadRooms = async () => {
    //fetchで8080に行く
    //await 返事が届くまで待つ
    const response = await fetch("http://localhost:8080/api/rooms");
    //response.json() JSONをJavaScriptのデータに変換
    const data = await response.json();
    //setRoomsで箱に入れる
    //setRooms(..)　箱の中身を入れ替えると画面が自動で書き直される
    setRooms(data);
  };

  //画面が最初に表示されたときに1度だけ実行
  useEffect(() => {
    loadRooms();
    //[] 1度だけ
  }, []);

  //createRoom　作成ボタンが押された時の関数
  const createRoom = async () => {
    //fetchの第二引数
    await fetch("http://localhost:8080/api/rooms", {
        //POSTで送る
      method: "POST",
      //中身はJSON
      headers: { "Content-Type": "application/json" },
      //送るデータは{roomName : roomName}を指定
      //Java側のbody.get("roomName")とペアになっているからキーがroomName
      body: JSON.stringify({ roomName: roomName }),
    });
    //setRoomName("")送った後は入力欄を空に戻す
    setRoomName("");
    //一覧を取り出す　(作ったroomがすぐ画面に出る)
    loadRooms();
  };

  return (
    <div className="home">
      <h1>ルーム一覧</h1>

      <div className="create-form">
        <input
          type="text"
          value={roomName}
          //onChangeが動いて箱が更新される
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="ルーム名"
        />
        <button onClick={createRoom}>作成</button>
      </div>

      {rooms.length === 0 ? (
        <p>まだルームがありません</p>
      ) : (
        // roomがあるなら一覧を表示
        <ul className="room-list">
          {rooms.map((room) => (
            //room.id DBのidをそのまま流用
            <li key={room.id}>{room.roomName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;