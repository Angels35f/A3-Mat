import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Game from "../jogos/Game";
import PalavrasC from "../jogos/PalavrasC";
import "./styles/sidebar.css";
import "./styles/header.css";

function App() {
  // Serve para ver o estado do jogo atual
  const [jogoAtual, setJogoAtual] = useState(null); 
  return (
    <div className="app">
      <div className="layout">
        <Sidebar
          onAbrirJogo={() => setJogoAtual("game")} 
          onAbrirPalavrasC={() => setJogoAtual("palavrasC")} 
        />
        <div className="main">
          <Header />
          <div className="content">
            {jogoAtual === "game" && <Game />}
            {jogoAtual === "palavrasC" && <PalavrasC />}
            {!jogoAtual && (
              <>
                <h1>Bem-vindo ao desafio de matematika!</h1>
                <p>Escolha uma opção ao lado para iniciar um jogo</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;