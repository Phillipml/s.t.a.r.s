import { useState } from "react";

import Logo from "../../components/logo/Logo.js";
import styles from "./Login.module.css";
import effects from "../../components/css_effects/css_effects.module.css";

function LoginForm({ onLogin, API_URL }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        onLogin();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.bg}>
      <div className={`${effects.scaleIn} ${styles.logo}`}>
        <Logo />
      </div>
      <form onSubmit={handleSubmit} className={effects.scaleIn}>
        <p className={styles.insert_credentials}>
          Please insert your credentials correctly to access this terminal
        </p>
        <div className={styles.center_itens} id="center_itens">
          <input
            className={effects.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={effects.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={effects.btn} type="submit">
            Login
          </button>
          <p>
            Your first day on S.T.A.R.S? Try to <a href="/register">register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
