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
    // Permitir apenas números de 0 a 9
    if (!/^[0-9]$/.test(value) && value !== "") return;

    const newGrid = [...grid];
    newGrid[index].value = value.slice(0, 1); // Apenas um dígito
    setGrid(newGrid);

    // Validar automaticamente apenas a linha ou a coluna
    const cell = grid[index];
    if (cell.row && cell.col) {
      const isLineComplete = newGrid
        .filter((c) => c.row === cell.row && c.editable)
        .every((c) => c.value !== ""); // Verifica se a linha está completa

      if (isLineComplete) {
        checkLine(cell.row, newGrid);
      } else {
        const isColumnComplete = newGrid
          .filter((c) => c.col === cell.col && c.editable)
          .every((c) => c.value !== ""); // Verifica se a coluna está completa

        if (isColumnComplete) {
          checkColumn(cell.col, newGrid);
        }
      }
    }
  };

  const checkLine = (row, gridToCheck) => {
    const lineCells = gridToCheck
      .filter((cell) => cell.row === row && cell.editable)
      .sort((a, b) => a.col - b.col);

    if (lineCells.length <= 1) return;

    const areContiguous = lineCells.every(
      (cell, index) =>
        index === 0 || cell.col === lineCells[index - 1].col + 1
    );

    const lineValue = lineCells.map((cell) => cell.value).join("");
    const correctValue = lineCells.map((cell) => cell.correctValue).join("");

    if (areContiguous && lineValue === correctValue) {
      alert(`A linha ${row} está correta!`);
      // Adicionar a classe .correct às células da linha
      const updatedGrid = [...grid];
      lineCells.forEach((cell) => {
        const cellElement = document.querySelector(
          `.cell[data-row="${cell.row}"][data-col="${cell.col}"]`
        );
        if (cellElement) {
          cellElement.classList.add("correct");
        }
        // Bloquear a célula
        const cellIndex = grid.findIndex(
          (c) => c.row === cell.row && c.col === cell.col
        );
        if (cellIndex !== -1) {
          updatedGrid[cellIndex].editable = false;
        }
      });
      setGrid(updatedGrid);
    }
  };

  const checkColumn = (col, gridToCheck) => {
    const columnCells = gridToCheck
      .filter((cell) => cell.col === col && cell.editable)
      .sort((a, b) => a.row - b.row);

    if (columnCells.length <= 1) return;

    const areContiguous = columnCells.every(
      (cell, index) =>
        index === 0 || cell.row === columnCells[index - 1].row + 1
    );

    const columnValue = columnCells.map((cell) => cell.value).join("");
    const correctValue = columnCells.map((cell) => cell.correctValue).join("");

    if (areContiguous && columnValue === correctValue) {
      alert(`A coluna ${col} está correta!`);
      // Adicionar a classe .correct às células da coluna
      const updatedGrid = [...grid];
      columnCells.forEach((cell) => {
        const cellElement = document.querySelector(
          `.cell[data-row="${cell.row}"][data-col="${cell.col}"]`
        );
        if (cellElement) {
          cellElement.classList.add("correct");
        }
        // Bloquear a célula
        const cellIndex = grid.findIndex(
          (c) => c.row === cell.row && c.col === cell.col
        );
        if (cellIndex !== -1) {
          updatedGrid[cellIndex].editable = false;
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