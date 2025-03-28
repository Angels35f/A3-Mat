import React, { useEffect, useRef } from "react";

function Game() {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 600;

    // Conectar ao servidor WebSocket
    socketRef.current = new WebSocket("ws://localhost:8765");

    // Mensagens do servidor
    socketRef.current.onmessage = (event) => {
      const state = JSON.parse(event.data);

      // Desenho do estado do jogo
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(state.x, state.y, 50, 0, Math.PI * 2);
      ctx.fill();
    };

    // Os eventos do teclado
    const handleKeyDown = (e) => {
      const comandos = {
        up: e.key === "ArrowUp",
        down: e.key === "ArrowDown",
        left: e.key === "ArrowLeft",
        right: e.key === "ArrowRight",
      };
      socketRef.current.send(JSON.stringify(comandos));
    };

    window.addEventListener("keydown", handleKeyDown);

    // Limpar eventos e fechar a conexão 
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      socketRef.current.close();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ border: "1px solid black" }}></canvas>;
}

export default Game;