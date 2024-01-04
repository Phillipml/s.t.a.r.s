// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import { login, logout, setUsername } from "./redux/actions";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import styles from "./components/css_effects/css_effects.module.css";

const API_URL = "http://localhost:3001/api";
const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const fetchedUsername = data.username;
          dispatch(setUsername(fetchedUsername));
        } else if (response.status === 401) {
          console.log(store.getState().user.username);
        }
      } catch (error) {
        console.log("Failed to fetch user:", error);
      }
    };

    if (loggedIn) {
      fetchUser();
    }
  }, [loggedIn, dispatch]);

  return (
    <div className={styles.bg}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login API_URL={API_URL} />} />
          <Route path="/register" element={<Register API_URL={API_URL} />} />
          <Route
            path="/"
            element={
              loggedIn ? (
                <Home username={username} />
              ) : (
                <Login API_URL={API_URL} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

function ReduxApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default ReduxApp;
