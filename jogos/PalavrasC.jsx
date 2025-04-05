import { useState, useEffect } from "react";
import "../src/styles/PalavrasC.css";

export default function Crossword() {
  const cells = [
    // Palabra 1 - Horizontal
    { row: 1, col: 1, number: 1, editable: true, correctValue: "1", wordId: "1H" },
    { row: 1, col: 2, editable: true, correctValue: "2", wordId: "1H" },
    { row: 1, col: 3, editable: true, correctValue: "3", wordId: "1H" },
  
    // Palabra 2 - Vertical
    { row: 1, col: 5, number: 2, editable: true, correctValue: "4", wordId: "2V" },
    { row: 2, col: 5, editable: true, correctValue: "5", wordId: "2V" },
    { row: 3, col: 5, editable: true, correctValue: "6", wordId: "2V" },
  
    // Palabra 3 - Horizontal
    { row: 5, col: 2, number: 3, editable: true, correctValue: "7", wordId: "3H" },
    { row: 5, col: 3, editable: true, correctValue: "8", wordId: ["3H","4V"] },
    { row: 5, col: 4, editable: true, correctValue: "9", wordId: "3H" },
    { row: 5, col: 5, editable: true, correctValue: "0", wordId: "3H" },
  
    // Palabra 4 - Vertical
    { row: 4, col: 3, number: 4, editable: true, correctValue: "1", wordId: "4V" },
    { row: 6, col: 3, editable: true, correctValue: "3", wordId: "4V" },
  
    // Palabra 5 - Horizontal
    { row: 8, col: 6, number: 5, editable: true, correctValue: "4", wordId: "5H" },
    { row: 8, col: 7, editable: true, correctValue: "5", wordId: "5H" },
    { row: 8, col: 8, editable: true, correctValue: "6", wordId: ["5H", "6V"] },
  
    // Palabra 6 - Vertical
    { row: 9, col: 8, editable: true, correctValue: "8", wordId: "6V" },
    { row: 10, col: 8, editable: true, correctValue: "9", wordId: "6V" },
  
    // Palabra 7 - Horizontal
    { row: 12, col: 2, number: 7, editable: true, correctValue: "0", wordId: "7H" },
    { row: 12, col: 3, editable: true, correctValue: "1", wordId: "7H" },
    { row: 12, col: 4, editable: true, correctValue: "2", wordId: "7H" },
    { row: 12, col: 5, editable: true, correctValue: "3", wordId: "7H" }
  ];
  
  const [grid, setGrid] = useState(
    cells.map((cell) => ({ ...cell, value: "" }))
  );

  const [time, setTime] = useState(0); // Tempo em segundos
  const [isRunning, setIsRunning] = useState(true); // Estado do cronômetro

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
    newGrid[index].value = value.slice(0, 1); // Apenas um dígito
    setGrid(newGrid);
  
    // Validar automaticamente as palavras associadas à célula
    const cell = grid[index];
    const wordIds = Array.isArray(cell.wordId) ? cell.wordId : [cell.wordId];
  
    wordIds.forEach(validateByWordId); // Validar cada palavra associada
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
  
    if (input === solution) {
      const updatedGrid = [...grid];
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
      setGrid(updatedGrid);
    }
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
    <div className="crossword-container">
    <div className="timer">
      Tempo: {String(Math.floor(time / 60)).padStart(2, "0")}:
      {String(time % 60).padStart(2, "0")}
    </div>
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
      <button className="validar_resposta" onClick={validateAnswers}>Validar Respostas</button>
    </div>
  );
}