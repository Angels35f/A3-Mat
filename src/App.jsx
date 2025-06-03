import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PalavrasC from "../public/jogos/PalavrasC";
import Home from "./components/Home";
import Game from "../public/jogos/test";
import BatalhaNavalPage from "./components/BatalhaNavalPage";
import "./styles/main.css";
import Dungeon from "./components/Dungeon";
import Graficos from "./components/Graficos";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detective" element={<Game />} />
          <Route path="/palavras-c" element={<PalavrasC />} />
          <Route path="/batalha-naval" element={<BatalhaNavalPage />} />
          <Route path="/dungeon" element={<Dungeon />} />
          <Route path="/graficos" element={<Graficos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;