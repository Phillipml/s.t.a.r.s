import React from "react";

function Home({ username, onClick }) {
  return (
    <div>
      {username && (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={onClick}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Home;
