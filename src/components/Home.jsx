import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [typedText, setTypedText] = useState(""); 

  useEffect(() => {
    const texto = "Maatemática divertida para todos!";
    let i = 0;

    const interval = setInterval(() => {
      if (i < texto.length) {
        setTypedText((prev) => prev + texto.charAt(i)); 
        i++;
      } else {
        clearInterval(interval); 
      }
    }, 80);

    return () => clearInterval(interval); 
  }, []); 
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container container">
          <div className="logo">🧠 Desafio MatematiKa</div>
          <button id="hamburger" className="hamburger">&#9776;</button>
          <ul id="nav-links" className="nav-links">
            <li><a href="#home">Início</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#jogos">Jogos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>
      </nav>

      {/* MASCOTE */}
      <div className="mascote">🤖</div>

      {/* HERO */}
      <header id="home" className="hero">
        <div className="container hero-content">
          <h1>
            <span>{typedText}</span>
            <span className="cursor">|</span>
          </h1>
          <p>Explore jogos educativos para se divertir enquanto aprende matemática!</p>
          <a href="#jogos" className="btn-primary">🎮 Começar a Jogar</a>
        </div>
      </header>

      {/* SOBRE */}
      <section id="sobre" className="section">
        <div className="container">
          <h2>📘 Sobre o Projeto</h2>
          <p>O Desafio Matematika é um trabalho acadêmico que transforma conteúdos de matemática em desafios interativos para crianças e adolescentes. Usamos lógica, criatividade e diversão para estimular o aprendizado!</p>
        </div>
      </section>

      {/* JOGOS */}
      <section id="jogos" className="section alt">
        <div className="container">
          <h2>🧩 Nossos Jogos</h2>
          <div className="cards">
            <Link to="/game" className="card">
              <h3>🔢 Jogo 1</h3>
              <p>Descrição do Jogo 1</p>
            </Link>
            <Link to="/palavras-c" className="card">
              <h3>📏 Jogo 2</h3>
              <p>Descrição do Jogo 2</p>
            </Link>
            <Link to="/batalha-naval" className="card">
              <h3>🎲 Jogo 3</h3>
              <p>Descrição do Jogo 3</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="section">
        <div className="container">
          <h2>📬 Fale Conosco</h2>
          <p>Envie uma mensagem para <a href="mailto:contato@desafmatematika.com">contato@desafmatematika.com</a></p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="footer">
        <p>© 2025 Desafio MatematiKa | Trabalho A3 2025/1</p>
      </footer>
    </>
  );
}

export default Home;