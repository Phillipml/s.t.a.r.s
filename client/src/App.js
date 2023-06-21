import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import Home from "./pages/Home/Home";

const API_URL = "http://localhost:3001/api";

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
      {/* <nav>
        {loggedIn ? (
          <Home username={loggedIn} onClick={handleLogout} />
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav> */}

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
              <Home username={loggedIn} onClick={handleLogout} />
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
