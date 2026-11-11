
import { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  // 入力されたメールアドレス
  const [email, setEmail] = useState("");

  // 入力されたパスワード
  const [password, setPassword] = useState("");

  // パスワードの表示・非表示
  const [showPassword, setShowPassword] = useState(false);

  // ログインフォーム送信時の処理
  const handleSubmit = (event) => {
    event.preventDefault();

    // 今回は画面だけなので、入力内容を確認する
    console.log("メールアドレス:", email);
    console.log("パスワード:", password);
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <h1 className="login-title">campus_chat</h1>
          <p className="login-description">
            学内コミュニケーションツール
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              placeholder="example@school.ac.jp"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="パスワードを入力"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "隠す" : "表示"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            ログイン
          </button>
        </form>

        <p className="login-note">
          学校アカウントでログインしてください。
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
