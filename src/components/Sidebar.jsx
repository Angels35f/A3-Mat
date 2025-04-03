import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="home">
        <FontAwesomeIcon icon={faHouse} /> Início
      </Link>
      <div className="content_1">
        <h2>Jogos</h2>
        <div className="button-group">
          <Link to="/game" className="botão_1"><FontAwesomeIcon icon={faGamepad} />Detetive</Link>
          <Link to="/palavras-c" className="botão_2"><FontAwesomeIcon icon={faGamepad} />Números Cruzados</Link>
          <Link to="/batalha-naval" className="botão_3"><FontAwesomeIcon icon={faGamepad} />Batalha Naval</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;