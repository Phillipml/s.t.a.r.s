import React from "react";

function Home({ username, onClick }) {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <button onClick={onClick}>Logout</button>
    </div>
  );
}

export default Home;
