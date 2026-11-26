import { useState } from "react";
import "./ChatHome.css";

const rooms = [
  { id: "general", name: "全体のお知らせ", category: "みんなのルーム", unread: 2 },
  { id: "class", name: "授業・課題の相談", category: "みんなのルーム", unread: 0 },
  { id: "lounge", name: "雑談ラウンジ", category: "みんなのルーム", unread: 0 },
  { id: "project", name: "グループ制作", category: "参加中のプロジェクト", unread: 0 },
];

const initialMessages = {
  general: [
    {
      id: 1,
      author: "田中先生",
      initials: "田",
      color: "lavender",
      time: "今日 09:12",
      content: "みなさん、おはようございます。今週の連絡事項をこちらにまとめていきます。",
    },
    {
      id: 2,
      author: "山田 太郎",
      initials: "山",
      color: "peach",
      time: "今日 09:18",
      content: "確認しました！ありがとうございます。",
    },
    {
      id: 3,
      author: "佐藤 花子",
      initials: "佐",
      color: "mint",
      time: "今日 09:24",
      content: "課題の提出期限についても、あとで確認してみます。",
    },
  ],
  class: [
    {
      id: 4,
      author: "鈴木 一郎",
      initials: "鈴",
      color: "blue",
      time: "今日 10:02",
      content: "次回の授業課題、どこまで進みましたか？",
    },
    {
      id: 5,
      author: "佐藤 花子",
      initials: "佐",
      color: "mint",
      time: "今日 10:08",
      content: "私は画面のレイアウトまでできました。API接続はこれからです！",
    },
  ],
  lounge: [
    {
      id: 6,
      author: "山田 太郎",
      initials: "山",
      color: "peach",
      time: "今日 08:45",
      content: "学食の新メニュー、もう食べた人いますか？",
    },
  ],
  project: [
    {
      id: 7,
      author: "佐藤 花子",
      initials: "佐",
      color: "mint",
      time: "昨日 16:30",
      content: "グループ制作の画面案をまとめました。時間があるときに見てもらえるとうれしいです。",
    },
  ],
};

function ChatHome() {
  const [activeRoomId, setActiveRoomId] = useState(rooms[0].id);
  const [messagesByRoom, setMessagesByRoom] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const activeRoom = rooms.find((room) => room.id === activeRoomId);
  const messages = messagesByRoom[activeRoomId] ?? [];

  function handleSubmit(event) {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;

    const newMessage = {
      id: Date.now(),
      author: "佐藤 花子",
      initials: "佐",
      color: "mint",
      time: "今",
      content,
    };

    setMessagesByRoom((current) => ({
      ...current,
      [activeRoomId]: [...(current[activeRoomId] ?? []), newMessage],
    }));
    setDraft("");
  }

  return (
    <main className="chat-home">
      <header className="home-header">
        <a className="home-brand" href="#" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark" aria-hidden="true">c</span>
          <span>campus<span className="brand-light">_chat</span></span>
        </a>
        <div className="header-search">
          <span aria-hidden="true">⌕</span>
          <span>ルームやメッセージを検索</span>
          <kbd>⌘ K</kbd>
        </div>
        <button className="help-button" type="button" aria-label="ヘルプ">?</button>
      </header>

      <div className="home-body">
        <aside className="workspace-rail" aria-label="ワークスペース">
          <div className="workspace-logo" title="campus_chat">C</div>
          <div className="rail-divider" />
          <button className="workspace-avatar active" type="button" aria-label="キャンパス">
            学
          </button>
          <button className="workspace-add" type="button" aria-label="ワークスペースを追加">
            +
          </button>
          <div className="rail-bottom-avatar">佐</div>
        </aside>

        <aside className="room-panel" aria-label="ルーム一覧">
          <div className="room-panel-top">
            <div>
              <p className="eyebrow">WORKSPACE</p>
              <h1>キャンパス</h1>
            </div>
            <button type="button" className="more-button" aria-label="メニュー">···</button>
          </div>

          <button className="new-message-button" type="button">
            <span>＋</span> 新しいメッセージ
          </button>

          <div className="room-section">
            <h2><span>⌄</span> みんなのルーム</h2>
            {rooms.filter((room) => room.category === "みんなのルーム").map((room) => (
              <button
                className={`room-link${activeRoomId === room.id ? " selected" : ""}`}
                key={room.id}
                type="button"
                onClick={() => setActiveRoomId(room.id)}
              >
                <span className="room-hash">#</span>
                <span className="room-name">{room.name}</span>
                {room.unread > 0 && <span className="unread-count">{room.unread}</span>}
              </button>
            ))}
          </div>

          <div className="room-section project-section">
            <h2><span>⌄</span> 参加中のプロジェクト</h2>
            {rooms.filter((room) => room.category === "参加中のプロジェクト").map((room) => (
              <button
                className={`room-link${activeRoomId === room.id ? " selected" : ""}`}
                key={room.id}
                type="button"
                onClick={() => setActiveRoomId(room.id)}
              >
                <span className="room-hash">#</span>
                <span className="room-name">{room.name}</span>
              </button>
            ))}
            <button className="add-room-link" type="button">＋ ルームを追加</button>
          </div>

          <div className="profile-card">
            <div className="profile-avatar">佐<span /></div>
            <div className="profile-copy">
              <strong>佐藤 花子</strong>
              <span>オンライン</span>
            </div>
            <button type="button" className="profile-menu" aria-label="プロフィールメニュー">···</button>
          </div>
        </aside>

        <section className="chat-content" aria-label={`${activeRoom.name}のチャット`}>
          <div className="chat-topbar">
            <div className="active-room-title">
              <span>#</span>
              <h2>{activeRoom.name}</h2>
              <span className="title-divider" />
              <p>クラスのみんなと気軽に話そう</p>
            </div>
            <div className="chat-actions">
              <div className="member-stack" aria-label="メンバー 8人">
                <span className="mini-avatar peach">山</span>
                <span className="mini-avatar lavender">田</span>
                <span className="mini-avatar blue">鈴</span>
                <span className="member-total">＋5</span>
              </div>
              <button type="button" className="icon-button" aria-label="メンバーを表示">♧</button>
              <button type="button" className="icon-button" aria-label="その他">···</button>
            </div>
          </div>

          <div className="conversation-scroll">
            <div className="room-welcome">
              <div className="welcome-hash">#</div>
              <h3>{activeRoom.name}へようこそ！</h3>
              <p>ここは「{activeRoom.name}」のルームです。メッセージを送って会話を始めましょう。</p>
              <button type="button" className="invite-button">メンバーを招待する <span>↗</span></button>
            </div>

            <div className="day-divider"><span>今日</span></div>
            <div className="message-list" aria-live="polite">
              {messages.map((message) => (
                <article className="message-row" key={message.id}>
                  <div className={`message-avatar ${message.color}`}>{message.initials}</div>
                  <div className="message-main">
                    <div className="message-heading">
                      <strong>{message.author}</strong>
                      <time>{message.time}</time>
                    </div>
                    <p>{message.content}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <form className="message-composer" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="mock-message">
              メッセージを入力
            </label>
            <input
              id="mock-message"
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={`# ${activeRoom.name} にメッセージを送信`}
            />
            <div className="composer-footer">
              <div className="composer-tools" aria-hidden="true">
                <span className="tool-plus">＋</span>
                <span>B</span>
                <span><i>I</i></span>
                <span>↗</span>
                <span>☺</span>
                <span>@</span>
              </div>
              <button type="submit" className="send-button" disabled={!draft.trim()}>
                送信 <span>➤</span>
              </button>
            </div>
          </form>
          <p className="mock-note">これは画面イメージです。メッセージはこの画面内だけに表示されます。</p>
        </section>
      </div>
    </main>
  );
}

export default ChatHome;
