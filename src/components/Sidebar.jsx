import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="content_1">
        <div className="button-group">
          <Link to="/game" className="botão_1">Abrir Jogo</Link>
          <Link to="/palavras-c" className="botão_2">Abrir PalavrasC</Link>
          <Link to="/batalha-naval" className="botão_3">Abrir Batalha Naval</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;