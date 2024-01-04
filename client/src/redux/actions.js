// actions.js
export const login = (token) => ({
  type: "LOGIN",
  payload: token,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const setUsername = (username) => ({
  type: "SET_USERNAME",
  payload: username,
});
