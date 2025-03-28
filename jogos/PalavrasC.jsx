import React, { useState } from "react";
import "../src/styles/palavrasC.css";

const PalavrasC = () => {
  const [board, setBoard] = useState(
    Array(5).fill(Array(5).fill(""))
  );

  const handleInputChange = (rowIndex, cellIndex, value) => {
    if (value.length > 1 || isNaN(value)) return;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === cellIndex ? value : cell))
    );
    setBoard(newBoard);
  };

  return (
    <div className="game-container">
      <h1>Palavras Cruzadas de Matemáticas</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="cell">
                <input
                  type="text"
                  value={cell}
                  onChange={(e) =>
                    handleInputChange(rowIndex, cellIndex, e.target.value)
                  }
                  maxLength={1} 
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    fontSize: "18px",
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PalavrasC;