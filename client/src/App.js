import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import Home from "./pages/Home/Home";

const API_URL = "http://localhost:3001/api";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
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
          setUsername(data.username);
        } else {
          console.log("Failed to fetch user:", response.statusText);
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
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} API_URL={API_URL} />}
        />
        <Route path="/register" element={<RegisterForm API_URL={API_URL} />} />
        <Route
          path="/"
          element={
            loggedIn ? (
              <Home username={username} onClick={handleLogout} />
            ) : (
              <Login API_URL={API_URL} onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
