import React, { useState, useEffect } from "react";

const tileMap = [
  [0, 1, 1, 2, 2],
  [1, 1, 0, 2, 2],
  [1, 0, 0, 2, 2],
  [2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2],
];

const tileTypes = {
  0: { image: "dirt.png", solid: false },
  1: { image: "grass.png", solid: false },
  2: { image: "lava.png", solid: true },
};

const objects = [
  { x: 64, y: 64, image: "diamond.png" },
  { x: 128, y: 128, image: "tree.png" },
];

function Map({ tileMap, tileTypes }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${tileMap[0].length}, 32px)`,
        gridTemplateRows: `repeat(${tileMap.length}, 32px)`,
      }}
    >
      {tileMap.flat().map((tile, index) => (
        <div
          key={index}
          style={{
            width: "32px",
            height: "32px",
            backgroundImage: `url(/content/images/${tileTypes[tile].image})`,
            backgroundSize: "cover",
          }}
        ></div>
      ))}
    </div>
  );
}

function Player({ x, y }) {
  return (
    <div
      style={{
        width: "32px",
        height: "32px",
        backgroundImage: "url(/content/images/Personagem2.png)",
        backgroundSize: "cover",
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      }}
    ></div>
  );
}

function Object({ x, y, image }) {
  return (
    <div
      style={{
        width: "32px",
        height: "32px",
        backgroundImage: `url(/content/images/${image})`,
        backgroundSize: "cover",
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
      }}
    ></div>
  );
}

function Game() {
  const [player, setPlayer] = useState({ x: 50, y: 50 });
  const [keys, setKeys] = useState({});
  const [collected, setCollected] = useState([]);
  const tileSize = 32;

  const handleKeyDown = (e) => setKeys((prev) => ({ ...prev, [e.key]: true }));
  const handleKeyUp = (e) => setKeys((prev) => ({ ...prev, [e.key]: false }));

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (keys["ArrowUp"]) newY -= tileSize;
        if (keys["ArrowDown"]) newY += tileSize;
        if (keys["ArrowLeft"]) newX -= tileSize;
        if (keys["ArrowRight"]) newX += tileSize;

       
        const tileX = Math.floor(newX / tileSize);
        const tileY = Math.floor(newY / tileSize);
        if (tileMap[tileY]?.[tileX] === 2) {
          return prev; 
        }

       
        objects.forEach((obj, index) => {
          if (newX === obj.x && newY === obj.y && !collected.includes(index)) {
            setCollected((prev) => [...prev, index]);
          }
        });

        return { x: newX, y: newY };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [keys, collected]);

  return (
    <div
      style={{
        width: "800px",
        height: "600px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#87CEEB",
      }}
    >
            <h1>Jogo sendo testado ainda.</h1>
      <Map tileMap={tileMap} tileTypes={tileTypes} />
      <Player x={player.x} y={player.y} />
      {objects.map(
        (obj, index) =>
          !collected.includes(index) && (
            <Object key={index} x={obj.x} y={obj.y} image={obj.image} />
          )
      )}
    </div>
  );
}

export default Game;