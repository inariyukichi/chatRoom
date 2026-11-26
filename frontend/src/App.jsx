import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  //ログイン済みかの確認 初期値はfalse(未ログイン)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //未ログインの間はLoginPageだけを出す
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }
  return <HomePage />;
}

export default App;
