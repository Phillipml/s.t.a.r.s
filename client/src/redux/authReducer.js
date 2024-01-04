// authReducer.js
const initialState = {
  loggedIn: false,
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, loggedIn: true, token: action.payload };
    case "LOGOUT":
      return { ...state, loggedIn: false, token: "" };
    default:
      return state;
  }
};

export default authReducer;
