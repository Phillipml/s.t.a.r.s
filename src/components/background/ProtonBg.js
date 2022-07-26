import React from "react";
import ReactDOM from "react-dom";
import Particles from "./components/Particles";

import "./styles.css";

function ProtonBg() {
  return (
    <div >
      <Particles />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ProtonBg />, rootElement);
export default ProtonBg
