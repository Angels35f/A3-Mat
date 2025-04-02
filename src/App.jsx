import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Game from "../jogos/Game";
import PalavrasC from "../jogos/PalavrasC";
import "./styles/sidebar.css";
import "./styles/header.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="layout">
          <Sidebar />
          <div className="main">
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/palavras-c" element={<PalavrasC />} />
                <Route
                  path="/batalha-naval"
                  element={
                    <iframe
                      src="/batalha/index.html" // Asegúrate de que esta ruta sea correcta
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
          </div>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <h1>Bem-vindo ao desafio de matematika!</h1>
      <p>Escolha uma opção ao lado para iniciar um jogo</p>
    </>
  );
}

export default App;