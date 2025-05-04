import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PalavrasC from "../jogos/PalavrasC";
import Home from "./components/Home";
import Game from "../jogos/test"
import "./styles/main.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/palavras-c" element={<PalavrasC />} />
          <Route
            path="/batalha-naval"
            element={
              <iframe
                src="/batalha/index.html"
                title="Batalha Naval"
                style={{
                  width: "100%",
                  height: "100vh",
                  border: "none",
                }}
              ></iframe>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;