import { useState, useEffect } from "react";
import Header from "../src/components/Header.jsx";
import "../src/styles/PalavrasC.css";

export default function Crossword() {
  const cells = [
    // Número 1- horizontal
    { row: 4, col: 1, number: 1, editable: true, correctValue: "1", wordId: "1H" },
    { row: 4, col: 2, editable: true, correctValue: "2", wordId: "1H" },
    { row: 4, col: 3, editable: true, correctValue: "3", wordId: ["1H","2V"] },
    { row: 4, col: 4, editable: true, correctValue: "5", wordId: "1H" },
    { row: 4, col: 5, editable: true, correctValue: "7", wordId: "1H" },

    // Número 1- Vertical
    { row: 1, col: 3, number: 2, editable: true, correctValue: "5", wordId: "2V" },
    { row: 2, col: 3, editable: true, correctValue: "8", wordId: "2V" },
    { row: 3, col: 3, editable: true, correctValue: "1", wordId: "2V" },
    { row: 5, col: 3, editable: true, correctValue: "6", wordId: "2V" },
    { row: 6, col: 3, editable: true, correctValue: "0", wordId: ["2V","3H"] },
  
    // Número 2 - Horizontal
    { row: 6, col: 2, number: 3, editable: true, correctValue: "1", wordId: "3H" },
    { row: 6, col: 4, editable: true, correctValue: "6", wordId: "3H" },
    { row: 6, col: 5, number: 4, editable: true, correctValue: "2", wordId: ["3H","4V"] },
  
    // Número 2 - Vertical
    { row: 7, col: 5, editable: true, correctValue: "0", wordId: "4V" },
    { row: 8, col: 5, editable: true, correctValue: "4", wordId: "4V" },
    { row: 9, col: 5, editable: true, correctValue: "8", wordId: ["4V","5H"] },

  
    // Número 3 - Horizontal
    { row: 9, col: 4, number: 5, editable: true, correctValue: "1", wordId: "5H" },
    { row: 9, col: 6, editable: true, correctValue: "2", wordId: "5H" },
    { row: 9, col: 7, editable: true, correctValue: "5", wordId: ["5H","6V"] },
    { row: 9, col: 8, editable: true, correctValue: "3", wordId: "5H" },
    { row: 9, col: 9, editable: true, correctValue: "8", wordId: ["5H","8V"] },
    { row: 9, col: 10, editable: true, correctValue: "5", wordId: "5H" },
    { row: 9, col: 11, editable: true, correctValue: "3", wordId: "5H" },
  
    // Número 3 - Vertical
    { row: 3, col: 7, number:6, editable: true, correctValue: "7", wordId: "6V" },
    { row: 4, col: 7, editable: true, correctValue: "3", wordId: "6V" },
    { row: 5, col: 7, editable: true, correctValue: "5", wordId: "6V" },
    { row: 6, col: 7, editable: true, correctValue: "1", wordId: "6V" },
    { row: 7, col: 7, number:7, editable: true, correctValue: "2", wordId: ["6V","7H"] },
    { row: 8, col: 7, editable: true, correctValue: "2", wordId: "6V" },
  
    // Número 4 - Horizontal
    { row: 7, col: 8,  editable: true, correctValue: "7", wordId: "7H" },
    { row: 7, col: 9, editable: true, correctValue: "6", wordId: ["7H","8V"] },
    { row: 7, col: 10, editable: true, correctValue: "3", wordId: "7H" },

    { row: 6, col:9, number: 8, editable: true, correctValue: "1", wordId: "8V"},
    { row: 8, col:9, editable: true, correctValue: "4", wordId: "8V"},
    { row: 10, col:9, editable: true, correctValue: "6", wordId: "8V"},

    
  ];
  
  const [grid, setGrid] = useState(
    cells.map((cell) => ({ ...cell, value: "" }))
  );

  const [showInstructions, setShowInstructions] = useState(true);
  const [time, setTime] = useState(0); // Tempo em segundos
  const [isRunning, setIsRunning] = useState(false); // Estado do cronômetro

  // Gerenciar o cronômetro
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleChange = (index, value) => {
    // Permitir apenas números de 0 a 9
    if (!/^[0-9]$/.test(value) && value !== "") return;
  
    const newGrid = [...grid];
    newGrid[index].value = value.slice(0, 1); 
    setGrid(newGrid);
  
    // Validar automaticamente os números associadas à célula
    const cell = grid[index];
    const wordIds = Array.isArray(cell.wordId) ? cell.wordId : [cell.wordId];
  
    wordIds.forEach(validateByWordId); 
  };
  
  const validateByWordId = (wordIdToCheck) => {
    const cellsInWord = grid.filter((cell) =>
      Array.isArray(cell.wordId)
        ? cell.wordId.includes(wordIdToCheck)
        : cell.wordId === wordIdToCheck
    );
  
    if (cellsInWord.length <= 1) return;
  
    const isComplete = cellsInWord.every((cell) => cell.value !== "");
    if (!isComplete) return;
  
    const input = cellsInWord.map((c) => c.value).join("");
    const solution = cellsInWord.map((c) => c.correctValue).join("");
  
    const updatedGrid = [...grid];
  
    cellsInWord.forEach((cell) => {
      const cellElement = document.querySelector(
        `.cell[data-row="${cell.row}"][data-col="${cell.col}"]`
      );
      if (cellElement) {
        
        cellElement.classList.remove("correct", "incorrect");
      }
    });
  
    if (input === solution) {
      cellsInWord.forEach((cell) => {
        const cellElement = document.querySelector(
          `.cell[data-row="${cell.row}"][data-col="${cell.col}"]`
        );
        if (cellElement) cellElement.classList.add("correct");

        const idx = updatedGrid.findIndex(
          (c) => c.row === cell.row && c.col === cell.col
        );
        if (idx !== -1) {
          updatedGrid[idx].editable = false;
        }
      });
    } else {
      cellsInWord.forEach((cell) => {
        const cellElement = document.querySelector(
          `.cell[data-row="${cell.row}"][data-col="${cell.col}"]`
        );
        if (cellElement) cellElement.classList.add("incorrect");
      });
    }
  
    setGrid(updatedGrid);
  };
  
  const validateAnswers = () => {
    const isCorrect = grid.every(
      (cell) => cell.value === cell.correctValue
    );
  
    if (isCorrect) {
      setIsRunning(false); // Parar o cronômetro apenas se tudo estiver correto
      alert(`Parabéns, você completou o jogo em ${time} segundos!`);
    } else {
      alert("Algumas respostas estão incorretas. Continue tentando.");
    }
  };
    return (
     <>
      <Header
  background="#9acef8"
  textColor="#264653"
  sobreContent={
          <div>
            <h2>Sobre este jogo</h2>
            <p>
              Este jogo foi feito por{" "}
              <strong>Angel Santiago Fernandez Pataquiva</strong>.
            </p>
          </div>
        }
/>
      {showInstructions ? (
        <div className="instructions-overlay">
          <div className="instructions-content">
            <h2>Como jogar</h2>
            <ul style={{ textAlign: "left", maxWidth: 400, margin: "0 auto" }}>
              <li>Preencha o crucigrama com os números corretos.</li>
              <li>Responda às perguntas ao lado para encontrar as respostas.</li>
              <li>Clique em "Jogar" para começar. O tempo será contado!</li>
              {/* Agrega tus instrucciones personalizadas aqui */}
            </ul>
            <button
              className="start-game-btn"
              onClick={() => {
                setShowInstructions(false);
                setIsRunning(true);
              }}
            >
              Jogar
            </button>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 80 }} className="crossword-container">
          {/* Temporizador */}
          <div className="timer">
            Tempo: {String(Math.floor(time / 60)).padStart(2, "0")}:
            {String(time % 60).padStart(2, "0")}
          </div>
          <div className="crossword-layout">
           
            <div className="crossword-board">
              {grid.map((cell, index) => (
                <div
                  key={index}
                  className="cell"
                  data-row={cell.row}
                  data-col={cell.col}
                  style={{
                    gridRow: cell.row,
                    gridColumn: cell.col,
                  }}
                >
                  {cell.number && <span className="clue">{cell.number}</span>}
                  <input
                    type="text"
                    maxLength="1"
                    value={cell.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    disabled={!cell.editable}
                  />
                </div>
              ))}
            </div>
        
            {/* Quadro de perguntas */}
            <div className="questions">
              <h3>Perguntas</h3>
              <div className="questions-columns">
                <div className="horizontal-questions">
                  <h4>Horizontal</h4>
                  <ul>
                    <li>1. Sendo que, A=&#123;2,5,7&#125; e B=&#123;1,2,3&#125;, então A∪B é:</li>
                    <li>3. Se temos a função f(x)=25x+137, qual o valor de f(37)?</li>
                    <li>
                        5. Calcule o determinante da seguinte matriz:
                        <table style={{ borderCollapse: "collapse", marginTop: "5px" }}>
                          <tbody>
                            <tr>
                              <td style={{ border: "1px solid black", padding: "5px" }}>47</td>
                              <td style={{ border: "1px solid black", padding: "5px" }}>29</td>
                            </tr>
                            <tr>
                              <td style={{ border: "1px solid black", padding: "5px" }}>36</td>
                              <td style={{ border: "1px solid black", padding: "5px" }}>81</td>
                            </tr>
                          </tbody>
                        </table>
                      </li>
                      <li>7. Sendo o conjunto A=&#123;7,10,18,25,38,44,53,60&#125; e o conjunto B=&#123;18,20,25,38,53,61&#125;, Qual é a interseção A∩B?</li>
                  </ul>
                </div>
                <div className="vertical-questions">
                  <h4>Vertical</h4>
                  <ul>
                    <li>2. Seja a função f(x)=80x²+40x-40, qual o valor de f(85)?</li>
                    <li>4. Seja A=&#123;1024,2048,409&#125; e B=&#123;2048,8192&#125;, qual é a interseção entre A∩B?</li>
                    <li>6. Se o cojunto A=&#123;1,2,3,...,1782&#125;(sem multiplos de 100) e B=&#123;5,6,7,...,4211&#125;(sem multiplos de 100) quantos pares ordenados tem o produto cartesiano de A*B?</li>
                    <li>8. Dada a função f(x)=3x²+472x+8731, se f(15), qual o resultado da função?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      
          {/* Botão para validar respostas */}
          <button className="validar_resposta" onClick={validateAnswers}>
            Validar Respostas
          </button>
        </div>
      )}
    </>
  );
};