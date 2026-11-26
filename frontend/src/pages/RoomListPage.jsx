function RoomListPage({ user, onLogout }) {
  return (
    <main>
      <h1>ルーム一覧（仮）</h1>
      <p>ログインできました：{user.name}（id: {user.id} / {user.email}）</p>
      <p>ここにルーム一覧が入ります。</p>
      <button type="button" onClick={onLogout}>ログアウト</button>
    </main>
  );
}

export default RoomListPage;