import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Home from "./pages/Home/Home";
import styles from "./components/css_effects/css_effects.module.css";

const API_URL = "http://localhost:3001/api";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    setLoggedIn(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setLoggedIn(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${loggedIn}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const username = await data.username;
          setUsername(username);
        } else if (response.status === 401) {
          console.log(username);
        }
      } catch (error) {
        console.log("Failed to fetch user:", error);
      }
    };

    if (loggedIn) {
      fetchUser();
    }
  }, [loggedIn]);

  return (
    <div className={styles.bg}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} API_URL={API_URL} />}
          />
          <Route path="/register" element={<Register API_URL={API_URL} />} />
          <Route
            path="/"
            element={
              loggedIn ? (
                username ? (
                  <Home username={username} onClick={handleLogout} />
                ) : (
                  <div>Carregando...</div>
                )
              ) : (
                <Login API_URL={API_URL} onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
