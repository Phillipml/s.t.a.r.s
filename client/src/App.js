import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Recaptcha } from "react-recaptcha";

const API_URL = "http://localhost:3001/api";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação do reCAPTCHA
    // if (!recaptchaToken) {
    //   alert("Please complete the reCAPTCHA verification");
    //   return;
    // }

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
      {/* <Recaptcha
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        verifyCallback={setRecaptchaToken}
      /> */}
      <button type="submit">Login</button>
    </form>
  );
}

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação do reCAPTCHA
    // if (!recaptchaToken) {
    //   alert("Please complete the reCAPTCHA verification");
    //   return;
    // }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      // recaptchaToken no stringify acima

      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully");
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
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* <Recaptcha
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        verifyCallback={setRecaptchaToken}
      /> */}
      <button type="submit">Register</button>
    </form>
  );
}

function Home({ username }) {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <nav>
        {loggedIn ? (
          <div>
            <span>Welcome, {loggedIn}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/"
          element={
            loggedIn ? (
              <Home username={loggedIn} />
            ) : (
              <h1>Welcome to the Login System</h1>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
