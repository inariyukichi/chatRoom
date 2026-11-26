import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
//   useState(null) 今ログインしてる人を入れる箱
  const [currentUser, setCurrentUser] = useState(null);

  if (currentUser === null) {
    return <LoginPage onLogin={setCurrentUser} />;
  }

  return <HomePage />;
}

export default App;