import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

// Componente de cabeçalho com navegação e modal de jogos/créditos
export default function Header({
  sobreContent,
  jogosContent,
  contatoContent,
  background,
  textColor
}) {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  // Fecha o modal ao clicar fora do conteúdo
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) setModal(null);
  };

  return (
    <>
      <nav
        className="navbar"
        style={{
          background: background || undefined,
          color: textColor || "#264653"
        }}
      >
        <div className="nav-container container">
          <Link
            to="/"
            className="logo"
            style={{
              textDecoration: "none",
              color: textColor || "#264653"
            }}
          >
            🧠 Desafio MatematiKa
          </Link>
          <button id="hamburger" className="hamburger">&#9776;</button>
          <ul id="nav-links" className="nav-links">
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <button className="nav-btn" onClick={() => setModal("sobre")}>Criador</button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => setModal("jogos")}>Jogos</button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => setModal("contato")}>Créditos</button>
            </li>
          </ul>
        </div>
      </nav>

      {modal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModal(null)}>×</button>
            {modal === "sobre" && (sobreContent || <p>Conteúdo sobre este jogo.</p>)}
            {modal === "jogos" && (
              jogosContent ||
              <div>
                <h2 style={{ textAlign: "center" }}>Nossos Jogos</h2>
                <div className="jogos-list">
                  <div className="jogo-card" onClick={() => { setModal(null); navigate("/detective"); }}>
                    <span role="img" aria-label="detective" style={{ fontSize: 32 }}>🕵️‍♂️</span>
                    <h3>Own case</h3>
                    <p>Resolva o mistério neste jogo investigativo em Python!</p>
                  </div>
                  <div className="jogo-card" onClick={() => { setModal(null); navigate("/palavras-c"); }}>
                    <span role="img" aria-label="cruzadinha" style={{ fontSize: 32 }}>🧮</span>
                    <h3>Palavras Cruzadas</h3>
                    <p>Desafie-se com o nosso jogo de palavras cruzadas matemáticas!</p>
                  </div>
                  <div className="jogo-card" onClick={() => { setModal(null); navigate("/batalha-naval"); }}>
                    <span role="img" aria-label="batalha naval" style={{ fontSize: 32 }}>🚢</span>
                    <h3>Batalha Naval</h3>
                    <p>Encontre os navios no plano cartesiano!</p>
                  </div>
                  <div className="jogo-card" onClick={() => { setModal(null); navigate("/dungeon"); }}>
                    <span role="img" aria-label="novo jogo" style={{ fontSize: 32 }}>🗡️</span>
                    <h3>RPG EXE</h3>
                    <p>Entre em masmorras e lute contra inimigos, usando seus conhecimentos matemáticos para vencer!</p>
                  </div>
                </div>
              </div>
            )}
            {modal === "contato" && (contatoContent || <p>Site feito por:
                <br />Angel Santiago Fernandez Pataquiva<br />  
                <br /> Henrique Assao Taminato<br />
                <br />Lucas Henrique de Oliveira Piorino<br />
                <br />Para conclusão da nota A3 da matéria Estruturas Matemáticas.<br />
                <br />Faculdade: Anhembi Morumbi</p>)}
          </div>
        </div>
      )}
    </>
  );
}