import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PalavrasC from "../jogos/PalavrasC";
import Home from "./components/Home";
import Game from "../jogos/test";
import BatalhaNavalPage from "./components/BatalhaNavalPage";
import "./styles/main.css";
import Dungeon from "./components/Dungeon";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detective" element={<Game />} />
          <Route path="/palavras-c" element={<PalavrasC />} />
          <Route path="/batalha-naval" element={<BatalhaNavalPage />} />
          <Route path="/dungeon" element={<Dungeon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;