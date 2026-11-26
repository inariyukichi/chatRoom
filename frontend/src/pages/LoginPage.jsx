import { useState } from "react";
import "./LoginPage.css";

const MOCK_USERS = [
  { id: 1, name: "山田太郎", email: "student1@example.com", password: "dummy_hash_001" },
  { id: 2, name: "佐藤花子", email: "student2@example.com", password: "dummy_hash_002" },
  { id: 3, name: "田中先生", email: "teacher1@example.com", password: "dummy_hash_003" },
];

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (user === undefined) {
      setError("メールアドレスまたはパスワードが違います。");
      return;
    }
    setError("");
    onLogin({ id: user.id, name: user.name, email: user.email });
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <h1 className="login-title">campus_chat</h1>
          <p className="login-description">学内コミュニケーションツール</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input id="email" type="email" placeholder="example@school.ac.jp"
              value={email} onChange={(e) => setEmail(e.target.value)}
              autoComplete="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <div className="password-wrapper">
              <input id="password" type={showPassword ? "text" : "password"}
                placeholder="パスワードを入力"
                value={password} onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" required />
              <button type="button" className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "隠す" : "表示"}
              </button>
            </div>
          </div>
          {error !== "" && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" className="login-button">ログイン</button>
        </form>
        <p className="login-note">学校アカウントでログインしてください。</p>
      </section>
    </main>
  );
}

export default LoginPage;