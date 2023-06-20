import { useState } from "react";
import { Recaptcha } from "react-recaptcha";
export const LoginForm = ({ onLogin }) => {
  const API_URL = "http://localhost:3001/api";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação do reCAPTCHA
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification");
      return;
    }

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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Recaptcha
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        verifyCallback={setRecaptchaToken}
      />
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginForm;
