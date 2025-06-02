import React, { useState } from "react";
import Header from "../src/components/Header"; 

export default function DetectiveLauncher() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRunLocal = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("http://localhost:3001/run-python");
      const text = await res.text();
      setOutput(text);
    } catch (err) {
      setOutput("No se pudo ejecutar el juego. ¿Está el servidor Node.js corriendo?");
    }
    setLoading(false);
  };

  return (
    <>
      <Header
        background="rgba(20, 10, 30, 0.5)"
        textColor="#fff"
        sobreContent={
          <div>
            <h2>Sobre este jogo</h2>
            <p>
              Este jogo foi feito por <strong>Henrique Assao Taminato</strong>.
            </p>
          </div>
        }
      />
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url("/assets/Plano_Fundo.png"), linear-gradient(to bottom, #7b1e3a 0%, #1a237e 100%)`,
          backgroundPosition: "center top, center top",
          backgroundSize: "contain, cover", 
          backgroundRepeat: "no-repeat, no-repeat",
          paddingTop: 120, 
        }}
      >
        <div style={{
          maxWidth: 500,
          margin: "0 auto",
          padding: 32,
          background: "rgba(0,0,0,0.7)",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          textAlign: "center",
          color: "#fff"
        }}>
          <h2>Own Case - Jogo de detetives (Python)</h2>
          <button
            onClick={handleRunLocal}
            style={{
              background: "#264653",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 8,
              border: "none",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer"
            }}
            disabled={loading}
          >
            {loading ? "Ejecutando..." : "Ejecutar el juego localmente"}
          </button>
          <div style={{
            background: "#f1faee",
            borderRadius: 8,
            padding: 16,
            fontSize: 15,
            color: "#222",
            textAlign: "left",
            marginTop: 24
          }}>
            <strong>¿Cómo funciona?</strong>
            <ol>
              <li>Deve estar instalado Python 3 na máquina.</li>
              <li>O servidor Node.js deve estar ativo (<code>node run-python-server.cjs</code>).</li>
              <li>Click no botão para executar o jogo de modo local<code>main.py</code> na sua máquina. Por enquanto o jogo só pode ser jogado de forma local.</li>
            </ol>
            {output && (
              <pre style={{
                background: "#e0e0e0",
                padding: 8,
                borderRadius: 4,
                marginTop: 12,
                maxHeight: 200,
                overflow: "auto"
              }}>{output}</pre>
            )}
          </div>
        </div>
      </div>
    </>
  );
}