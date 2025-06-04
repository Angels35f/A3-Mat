const BOARD_SIZE = 10;
const SHIPS = [
    { name: "Porta-Aviões", size: 5 },
    { name: "Navio-Tanque", size: 4 },
    { name: "Contratorpedeiro", size: 3 },
    { name: "Submarino", size: 3 },
    { name: "Barco de Patrulha", size: 2 }
];

let gameState = {
    playerShips: [],
    computerShips: [],
    playerAttacks: new Set(),
    computerAttacks: new Set(),
    gameOver: false,
    hits: 0,
    misses: 0,
    sunkShips: [],
    huntTargets: [],
    lastMisses: []
};

let difficulty = 'easy';

const attackGrid = document.getElementById('attack-grid');
const shipGrid = document.getElementById('ship-grid');
const coordinateInput = document.getElementById('coordinate-input');
const attackBtn = document.getElementById('attack-btn');
const restartBtn = document.getElementById('restart-btn');
const gameStatus = document.getElementById('game-status');
const difficultySelect = document.getElementById('difficulty-select');
const difficultyLabel = document.getElementById('difficulty-label');
const historyAll = document.getElementById('history-all');
const historyHits = document.getElementById('history-hits');
const historyMisses = document.getElementById('history-misses');


difficultySelect.addEventListener('change', () => {
    difficulty = difficultySelect.value;
    updateDifficultyLabel();
});

function updateDifficultyLabel() {
    const labels = {
        easy: 'Fácil 🎲',
        medium: 'Médio 🧠',
        hard: 'Difícil 🔥'
    };
    if (difficultyLabel) {
        difficultyLabel.textContent = ` — Dificuldade: ${labels[difficulty]}`;
    }
}

function initGame() {
    gameState = {
        playerShips: [],
        computerShips: [],
        playerAttacks: new Set(),
        computerAttacks: new Set(),
        gameOver: false,
        hits: 0,
        misses: 0,
        sunkShips: [],
        huntTargets: [],
        lastMisses: []
    };
    createGrids();
    placeShips(gameState.playerShips, true);
    placeShips(gameState.computerShips, false);
    updateGrids();
    updateDifficultyLabel();
    gameStatus.textContent = "Jogo iniciado. Digite coordenadas para atacar!";
}

function createGrids() {
    attackGrid.innerHTML = '';
    shipGrid.innerHTML = '';
    for (let y = 0; y <= BOARD_SIZE; y++) {
        for (let x = 0; x <= BOARD_SIZE; x++) {
            if (x === 0 && y === 0) {
                addCell(attackGrid, ' ', 'coordinate');
                addCell(shipGrid, ' ', 'coordinate');
            } else if (x === 0) {
                addCell(attackGrid, y, 'coordinate');
                addCell(shipGrid, y, 'coordinate');
            } else if (y === 0) {
                addCell(attackGrid, String.fromCharCode(64 + x), 'coordinate');
                addCell(shipGrid, String.fromCharCode(64 + x), 'coordinate');
            } else {
                const attackCell = addCell(attackGrid, '·', 'water');
                const shipCell = addCell(shipGrid, '·', 'water');
                attackCell.dataset.x = x;
                attackCell.dataset.y = y;
                shipCell.dataset.x = x;
                shipCell.dataset.y = y;
            }
        }
    }
}

function addCell(grid, content, className = '') {
    const cell = document.createElement('div');
    cell.className = `cell ${className}`;
    cell.textContent = content;
    grid.appendChild(cell);
    return cell;
}

function placeShips(shipsArray, isPlayer) {
    for (const ship of SHIPS) {
        let placed = false;
        while (!placed) {
            const horizontal = Math.random() < 0.5;
            const x = horizontal
                ? Math.floor(Math.random() * (BOARD_SIZE - ship.size + 1)) + 1
                : Math.floor(Math.random() * BOARD_SIZE) + 1;
            const y = horizontal
                ? Math.floor(Math.random() * BOARD_SIZE) + 1
                : Math.floor(Math.random() * (BOARD_SIZE - ship.size + 1)) + 1;
            const positions = [];
            let valid = true;
            for (let i = 0; i < ship.size; i++) {
                const posX = horizontal ? x + i : x;
                const posY = horizontal ? y : y + i;
                positions.push({ x: posX, y: posY });
                for (const otherShip of shipsArray) {
                    if (otherShip.positions.some(p => p.x === posX && p.y === posY)) {
                        valid = false;
                        break;
                    }
                }
                if (!valid) break;
            }
            if (valid) {
                shipsArray.push({ name: ship.name, size: ship.size, positions, hits: new Set() });
                placed = true;
            }
        }
    }
}

function updateGrids() {
    for (let y = 1; y <= BOARD_SIZE; y++) {
        for (let x = 1; x <= BOARD_SIZE; x++) {
            const idx = y * (BOARD_SIZE + 1) + x;
            const attackCell = attackGrid.children[idx];
            const shipCell = shipGrid.children[idx];
            attackCell.className = 'cell';
            attackCell.textContent = '·';
            shipCell.className = 'cell';
            shipCell.textContent = '·';
            const key = `${x},${y}`;
            if (gameState.playerAttacks.has(key)) {
                let hit = false;
                for (const ship of gameState.computerShips) {
                    if (ship.positions.some(p => p.x === x && p.y === y)) {
                        hit = true;
                        attackCell.className = 'cell hit';
                        attackCell.textContent = 'X';
                        break;
                    }
                }
                if (!hit) {
                    attackCell.className = 'cell miss';
                    attackCell.textContent = 'O';
                }
            }
            for (const ship of gameState.playerShips) {
                if (ship.positions.some(p => p.x === x && p.y === y)) {
                    shipCell.className = 'cell ship';
                    shipCell.textContent = '#';
                }
            }
            if (gameState.computerAttacks.has(key)) {
                let hit = false;
                for (const ship of gameState.playerShips) {
                    if (ship.positions.some(p => p.x === x && p.y === y)) {
                        hit = true;
                        ship.hits.add(key);
                        shipCell.className = 'cell hit';
                        shipCell.textContent = 'X';
                        break;
                    }
                }
                if (!hit) {
                    shipCell.className = 'cell miss';
                    shipCell.textContent = 'O';
                }
            }
        }
    }
}

function updateHistory() {
    const attacks = Array.from(gameState.playerAttacks);
    const hits = [];
    const misses = [];

    for (const coord of attacks) {
        let isHit = false;
        for (const ship of gameState.computerShips) {
            if (ship.positions.some(p => `${p.x},${p.y}` === coord)) {
                isHit = true;
                break;
            }
        }
        if (isHit) {
            hits.push(coord);
        } else {
            misses.push(coord);
        }
    }

    historyAll.textContent = `{ ${attacks.join(' ; ')} }`;
    historyHits.textContent = `{ ${hits.join(' ; ')} }`;
    historyMisses.textContent = `{ ${misses.join(' ; ')} }`;
}


function computerAttack() {
    if (gameState.gameOver) return;

    let x, y, key;

    if (difficulty === 'hard' && gameState.huntTargets.length > 0) {
        const next = gameState.huntTargets.shift();
        x = next.x;
        y = next.y;
        key = `${x},${y}`;
    } else if (difficulty === 'medium') {
        do {
            x = Math.floor(Math.random() * BOARD_SIZE) + 1;
            y = Math.floor(Math.random() * BOARD_SIZE) + 1;
            key = `${x},${y}`;
        } while (
            gameState.computerAttacks.has(key) ||
            gameState.lastMisses.includes(key)
        );
    } else {
        do {
            x = Math.floor(Math.random() * BOARD_SIZE) + 1;
            y = Math.floor(Math.random() * BOARD_SIZE) + 1;
            key = `${x},${y}`;
        } while (gameState.computerAttacks.has(key));
    }

    gameState.computerAttacks.add(key);
    let hit = false;
    let sunkShip = null;

    for (const ship of gameState.playerShips) {
        if (ship.positions.some(p => p.x === x && p.y === y)) {
            hit = true;
            ship.hits.add(key);

            if (difficulty === 'hard') {
                const neighbors = [
                    { x: x + 1, y }, { x: x - 1, y },
                    { x, y: y + 1 }, { x, y: y - 1 }
                ];
                for (const pos of neighbors) {
                    const adjKey = `${pos.x},${pos.y}`;
                    if (
                        pos.x >= 1 && pos.x <= BOARD_SIZE &&
                        pos.y >= 1 && pos.y <= BOARD_SIZE &&
                        !gameState.computerAttacks.has(adjKey) &&
                        !gameState.huntTargets.some(p => p.x === pos.x && p.y === pos.y)
                    ) {
                        gameState.huntTargets.push(pos);
                    }
                }
            }

            if (ship.hits.size === ship.positions.length) {
                sunkShip = ship;
                if (difficulty === 'hard') gameState.huntTargets = [];
            }

            break;
        }
    }

    if (!hit && difficulty === 'medium') {
        gameState.lastMisses.push(key);
        if (gameState.lastMisses.length > 5) gameState.lastMisses.shift();
    }

    updateGrids();

    const allSunk = gameState.playerShips.every(s => s.hits.size === s.positions.length);
    if (allSunk) {
        gameState.gameOver = true;
        gameStatus.textContent += " ☠️ O computador afundou todos os seus navios!";
        return;
    }

    if (sunkShip) {
        gameStatus.textContent += ` O computador afundou seu ${sunkShip.name}!`;
    } else if (hit) {
        gameStatus.textContent += ` O computador acertou em (${String.fromCharCode(64 + x)}${y}).`;
    } else {
        gameStatus.textContent += ` O computador errou.`;
    }
}

function playerAttack(x, y) {
    if (gameState.gameOver) return;
    const key = `${x},${y}`;
    if (gameState.playerAttacks.has(key)) {
        gameStatus.textContent = `Você já atacou (${x},${y})!`;
        return false;
    }

    updateHistory();


    gameState.playerAttacks.add(key);
    let hit = false;
    let sunkShip = null;

    for (const ship of gameState.computerShips) {
        if (ship.positions.some(p => p.x === x && p.y === y)) {
            hit = true;
            ship.hits.add(key);
            gameState.hits++;
            if (ship.hits.size === ship.positions.length) {
                sunkShip = ship;
                gameState.sunkShips.push(ship.name);
            }
            break;
        }
    }

    if (!hit) gameState.misses++;

    updateGrids();

    const allSunk = gameState.computerShips.every(s => s.hits.size === s.positions.length);
    if (allSunk) {
        gameState.gameOver = true;
        gameStatus.textContent = "★ Você venceu! Todos os navios foram afundados!";
        return true;
    }

    if (sunkShip) {
        gameStatus.textContent = `Você afundou o ${sunkShip.name}!`;
    } else if (hit) {
        gameStatus.textContent = `Acertou em (${x},${y})!`;
    } else {
        gameStatus.textContent = `Água em (${x},${y}).`;
    }

    return true;
}

function parseCoordinate(input) {
    input = input.trim().toUpperCase();
    const match = input.match(/^(?:\(?\s*([A-J]|\d+)\s*[, ]\s*([A-J]|\d+)\s*\)?|([A-J])\s*(\d+))$/);
    if (!match) return null;
    let x, y;
    if (match[3]) {
        x = match[3].charCodeAt(0) - 64;
        y = parseInt(match[4]);
    } else {
        x = isNaN(match[1]) ? match[1].charCodeAt(0) - 64 : parseInt(match[1]);
        y = isNaN(match[2]) ? match[2].charCodeAt(0) - 64 : parseInt(match[2]);
    }
    if (x < 1 || x > BOARD_SIZE || y < 1 || y > BOARD_SIZE) return null;
    return { x, y };
}

attackBtn.addEventListener('click', () => {
    const input = coordinateInput.value;
    const coord = parseCoordinate(input);
    if (!coord) {
        gameStatus.textContent = "Coordenada inválida! Use (x,y) ou A1.";
        return;
    }
    if (playerAttack(coord.x, coord.y)) {
        if (!gameState.gameOver) setTimeout(computerAttack, 1000);
    }
    coordinateInput.value = '';
    coordinateInput.focus();
});

coordinateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') attackBtn.click();
});

restartBtn.addEventListener('click', initGame);

initGame();
