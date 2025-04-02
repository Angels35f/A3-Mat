import { useState, useEffect } from "react";
import "../src/styles/PalavrasC.css";

export default function Crossword() {
  const cells = [
    { row: 1, col: 1, number: 1, editable: true, correctValue: "1" },
    { row: 1, col: 2, number: 2, editable: true, correctValue: "2" },
    { row: 1, col: 3, number: 3, editable: true, correctValue: "3" },
    { row: 2, col: 2, editable: true, correctValue: "4" },
    { row: 3, col: 2, number: 4, editable: true, correctValue: "5" },
    { row: 3, col: 4, editable: true, correctValue: "6" },
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
    const newGrid = [...grid];
    newGrid[index].value = value.toUpperCase().slice(0, 1); // Apenas uma letra em maiúscula
    setGrid(newGrid);

    // Validar automaticamente a linha e a coluna
    const cell = grid[index];
    if (cell.row) {
      checkLine(cell.row, newGrid);
    }
    if (cell.col) {
      checkColumn(cell.col, newGrid);
    }
  };

  const checkLine = (row, gridToCheck) => {
    const lineCells = gridToCheck
      .filter((cell) => cell.row === row && cell.editable)
      .sort((a, b) => a.col - b.col);

    const areContiguous = lineCells.every(
      (cell, index) =>
        index === 0 || cell.col === lineCells[index - 1].col + 1
    );

    const lineValue = lineCells.map((cell) => cell.value).join("");
    const correctValue = lineCells.map((cell) => cell.correctValue).join("");

    if (areContiguous && lineValue === correctValue) {
      alert(`A linha ${row} está correta!`);
    }
  };

  const checkColumn = (col, gridToCheck) => {
    const columnCells = gridToCheck
      .filter((cell) => cell.col === col && cell.editable)
      .sort((a, b) => a.row - b.row);

    const areContiguous = columnCells.every(
      (cell, index) =>
        index === 0 || cell.row === columnCells[index - 1].row + 1
    );

    const columnValue = columnCells.map((cell) => cell.value).join("");
    const correctValue = columnCells.map((cell) => cell.correctValue).join("");

    if (areContiguous && columnValue === correctValue) {
      alert(`A coluna ${col} está correta!`);
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
      <div className="timer">Tempo: {time} segundos</div>
      <div className="crossword-board">
        {grid.map((cell, index) => (
          <div
            key={index}
            className="cell"
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
      <button onClick={validateAnswers}>Validar Respostas</button>
    </div>
  );
}