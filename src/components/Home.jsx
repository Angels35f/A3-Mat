import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Componente principal da página inicial
function Home() {
  // Frases que o mascote pode falar
  const frasesMascote = [
    "Já pensou em ser detetive?",
    "A matemática pode ser divertida!",
    "Clique em um jogo para começar!",
    "Você consegue!",
    "Imagina ir numa masmorra e lutar com monstros usando matemática?",
    "Não desista, tente outra vez!",
    "Que tal um desafio de lógica?",
    "Matemática é lógica e diversão!",
    "Já tomou água hoje?",
    "Vamos aprender brincando!",
    "Que tal da próxima vez um barco pirata?",
    "A matemática é como um jogo de estratégia!",
    "Você sabia que a matemática está em tudo ao nosso redor?",
    "A matemática é a linguagem do universo!",
  ];

  // Função para embaralhar um array (Fisher-Yates)
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Estado para o texto animado do título
  const [typedText, setTypedText] = useState(""); 
  // Estado para a mensagem do mascote
  const [mascoteMsg, setMascoteMsg] = useState("");
  // Estado para controlar as frases restantes do mascote (sem repetição)
  const [frasesRestantes, setFrasesRestantes] = useState(shuffle(frasesMascote));

  // Efeito para animar o texto do título principal
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

  // Função chamada ao clicar no mascote: mostra frase aleatória sem repetir
  const handleMascoteClick = () => {
    if (frasesRestantes.length === 0) {
      // Se acabarem as frases, embaralha novamente e avisa o usuário
      setFrasesRestantes(shuffle(frasesMascote));
      setMascoteMsg("Acabaram as frases! Clique de novo para recomeçar.");
      return;
    }
    // Mostra a próxima frase e atualiza o array de frases restantes
    const [frase, ...resto] = frasesRestantes;
    setMascoteMsg(frase);
    setFrasesRestantes(resto);
  };

  return (
    <>
      {/* Barra de navegação principal */}
      <nav className="navbar">
        <div className="nav-container container">
          <div className="logo">🧠 Desafio MatematiKa</div>
          <button id="hamburger" className="hamburger">&#9776;</button>
          <ul id="nav-links" className="nav-links">
            <li>
              <a href="#" onClick={e => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}>Início</a>
            </li>
            <li>
              <a href="#sobre" onClick={e => {
                e.preventDefault();
                document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
              }}>Sobre</a>
            </li>
            <li>
              <a href="#" onClick={e => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("abrirJogos"));
              }}>Jogos</a>
            </li>
            <li>
              <a href="#contato" onClick={e => {
                e.preventDefault();
                document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
              }}>Contato</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mascote interativo: mostra frases ao clicar */}
      <div className="mascote" onClick={handleMascoteClick} style={{ cursor: "pointer", userSelect: "none" }}>
        🤖
        {mascoteMsg && (
          <div style={{
            marginTop: 8,
            background: "#fff",
            color: "#222",
            borderRadius: 8,
            padding: "8px 16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "inline-block",
            fontSize: 16,
            position: "relative",
            left: 10
          }}>
            {mascoteMsg}
          </div>
        )}
      </div>

      {/* Seção principal com título animado e botão para jogos */}
      <header id="home" className="hero">
        <div className="container hero-content">
          <h1>
            <span>{typedText}</span>
            <span className="cursor">|</span>
          </h1>
          <p>Explore jogos educativos para se divertir enquanto aprende matemática!</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 24 }}>
            <Link
              to="#"
              className="btn-primary"
              style={{
                minWidth: 220,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none", // fuerza sin borde
                background: "var(--btn-bg, #00bfae)", // o tu color
                color: "#fff",
                textDecoration: "none"
              }}
              onClick={e => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("abrirJogos"));
              }}
            >
              🎮 Começar a Jogar
            </Link>
            <Link
              to="/graficos"
              className="btn-primary"
              style={{
                minWidth: 220,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                background: "var(--btn-bg, #00bfae)",
                color: "#fff",
                textDecoration: "none"
              }}
            >
              📈 Gráficos Interativos
            </Link>
          </div>
        </div>
      </header>

      {/* Seção "Sobre" com explicação do projeto */}
      <section id="sobre" className="section">
        <div className="container">
          <h2>📘 Sobre o Projeto</h2>
          <p>O Desafio Matematika é um trabalho acadêmico que transforma conteúdos de matemática em desafios interativos para adolescentes e adultos. Usamos lógica, criatividade e diversão para estimular o aprendizado!</p>
        </div>
      </section>

      {/* Seção de jogos: cards para cada jogo */}
      <section id="jogos" className="section alt">
        <div className="container">
          <h2>🧩 Nossos Jogos</h2>
          <div className="cards">
            <Link to="/detective" className="card">
              <h3>🕵️‍♂️ Own case</h3>
              <p>Resolva o mistério neste jogo investigativo em Python!</p>
            </Link>
            <Link to="/palavras-c" className="card">
              <h3>🧮 Números Cruzados</h3>
              <p>Desafie-se com o nosso jogo de números cruzados matemáticas!</p>
            </Link>
            <Link to="/batalha-naval" className="card">
              <h3>🚢 Batalha Naval</h3>
              <p>Encontre os navios no plano cartesiano!</p>
            </Link>
            <Link to="/dungeon" className="card">
              <h3>🗡️ RPG EXE</h3>
              <p>Entre em masmorras e lute contra inimigos, usando seus conhecimentos matemáticos para vencer!</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de contato */}
      <section id="contato" className="section">
        <div className="container">
          <h2>📬 Fale Conosco</h2>
          <p>Envie uma mensagem para <a href="mailto:contato@desafmatematika.com">contato@desafmatematika.com</a></p>
        </div>
      </section>

      {/* Rodapé com informações do projeto */}
      <footer className="footer">
        <p>© 2025 Desafio MatematiKa | Trabalho A3 2025/1</p>
      </footer>
    </>
  );
}

export default Home;