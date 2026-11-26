import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomListPage from "./pages/RoomListPage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  if (currentUser === null) {
    return <LoginPage onLogin={setCurrentUser} />;
  }

  return (
    <RoomListPage
      user={currentUser}
      onLogout={() => setCurrentUser(null)}
    />
  );
}

export default App;