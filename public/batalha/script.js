// Battleship Game - JavaScript Version
// Versão simples do jogo Batalha Naval (Battleship) em JavaScript
const BOARD_SIZE = 10;
const SHIPS = [
    { name: "Porta-Aviões", size: 5 },
    { name: "Navio-Tanque", size: 4 },
    { name: "Contratorpedeiro", size: 3 },
    { name: "Submarino", size: 3 },
    { name: "Barco de Patrulha", size: 2 }
];

// Estado do jogo
let gameState = {
    playerShips: [],
    computerShips: [],
    playerAttacks: new Set(),
    computerAttacks: new Set(),
    gameOver: false
};

// DOM
const attackGrid = document.getElementById('attack-grid');
const shipGrid = document.getElementById('ship-grid');
const coordinateInput = document.getElementById('coordinate-input');
const attackBtn = document.getElementById('attack-btn');
const restartBtn = document.getElementById('restart-btn');
const gameStatus = document.getElementById('game-status');

// Inicialização do jogo
function initGame() {
    // Limpar estado
    gameState = {
        playerShips: [],
        computerShips: [],
        playerAttacks: new Set(),
        computerAttacks: new Set(),
        gameOver: false
    };
    
    createGrids();
    
    // Posiciona navios
    placeShips(gameState.playerShips, true);
    placeShips(gameState.computerShips, false);
    
    // Atualizar display
    updateGrids();
    gameStatus.textContent = "Jogo iniciado. Digite coordenadas para atacar!";
}

// Cria os grids visuais
function createGrids() {
    attackGrid.innerHTML = '';
    shipGrid.innerHTML = '';
    
    // Cria células para ambos os grids
    for (let y = 0; y <= BOARD_SIZE; y++) {
        for (let x = 0; x <= BOARD_SIZE; x++) {
            // Células de coordenadas
            if (x === 0 && y === 0) {
                addCell(attackGrid, ' ', 'coordinate');
                addCell(shipGrid, ' ', 'coordinate');
            } 
            else if (x === 0) {
                addCell(attackGrid, y, 'coordinate');
                addCell(shipGrid, y, 'coordinate');
            } 
            else if (y === 0) {
                addCell(attackGrid, String.fromCharCode(64 + x), 'coordinate');
                addCell(shipGrid, String.fromCharCode(64 + x), 'coordinate');
            } 
            else {
                const attackCell = addCell(attackGrid, '·', 'water');
                const shipCell = addCell(shipGrid, '·', 'water');
                
                // Adicionar event listeners para debug (mostrar navios do computador)
                attackCell.dataset.x = x;
                attackCell.dataset.y = y;
                shipCell.dataset.x = x;
                shipCell.dataset.y = y;
            }
        }
    }
}

// Adicionar uma célula ao grid
function addCell(grid, content, className = '') {
    const cell = document.createElement('div');
    cell.className = `cell ${className}`;
    cell.textContent = content;
    grid.appendChild(cell);
    return cell;
}

// Posiciona navios aleatoriamente
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
            
            // Verificar se a posição é válida
            const positions = [];
            let valid = true;
            
            for (let i = 0; i < ship.size; i++) {
                const posX = horizontal ? x + i : x;
                const posY = horizontal ? y : y + i;
                positions.push({ x: posX, y: posY });
                
                // Verificar colisão com outros navios
                for (const otherShip of shipsArray) {
                    if (otherShip.positions.some(p => p.x === posX && p.y === posY)) {
                        valid = false;
                        break;
                    }
                }
                
                if (!valid) break;
            }
            
            if (valid) {
                shipsArray.push({
                    name: ship.name,
                    size: ship.size,
                    positions: positions,
                    hits: new Set()
                });
                placed = true;
            }
        }
    }
}

// Atualiza os grids visuais
function updateGrids() {
    // Limpa grids
    for (let y = 1; y <= BOARD_SIZE; y++) {
        for (let x = 1; x <= BOARD_SIZE; x++) {
            const attackIndex = y * (BOARD_SIZE + 1) + x;
            const shipIndex = y * (BOARD_SIZE + 1) + x;
            
            const attackCell = attackGrid.children[attackIndex];
            const shipCell = shipGrid.children[shipIndex];
            
            // Resetar células
            attackCell.className = 'cell';
            attackCell.textContent = '·';
            shipCell.className = 'cell';
            shipCell.textContent = '·';
            
            // Mostrar ataques do jogador
            const attackKey = `${x},${y}`;
            if (gameState.playerAttacks.has(attackKey)) {
                // Verificar se acertou algum navio do computador
                let hit = false;
                for (const ship of gameState.computerShips) {
                    if (ship.positions.some(p => p.x === x && p.y === y)) {
                        hit = true;
                        break;
                    }
                }
                
                if (hit) {
                    attackCell.className = 'cell hit';
                    attackCell.textContent = 'X';
                } else {
                    attackCell.className = 'cell miss';
                    attackCell.textContent = 'O';
                }
            }
            
            // Mostrar navios e ataques do computador (apenas para debug)
            for (const ship of gameState.playerShips) {
                if (ship.positions.some(p => p.x === x && p.y === y)) {
                    shipCell.className = 'cell ship';
                    shipCell.textContent = '#';
                }
            }
            
            const computerAttackKey = `${x},${y}`;
            if (gameState.computerAttacks.has(computerAttackKey)) {
                // Verificar se acertou algum navio do jogador
                let hit = false;
                for (const ship of gameState.playerShips) {
                    if (ship.positions.some(p => p.x === x && p.y === y)) {
                        hit = true;
                        ship.hits.add(computerAttackKey);
                        break;
                    }
                }
                
                if (hit) {
                    shipCell.className = 'cell hit';
                    shipCell.textContent = 'X';
                } else {
                    shipCell.className = 'cell miss';
                    shipCell.textContent = 'O';
                }
            }
        }
    }
}

// Processa ataque do jogador
function playerAttack(x, y) {
    if (gameState.gameOver) return;
    
    const attackKey = `${x},${y}`;
    
    // Verifica se já atacou no lugar
    if (gameState.playerAttacks.has(attackKey)) {
        gameStatus.textContent = `Você já atacou (${x},${y})! Tente outra coordenada.`;
        return false;
    }
    
    // Registra ataque
    gameState.playerAttacks.add(attackKey);
    
    // Verifica se acertou algum navio
    let hit = false;
    let sunkShip = null;
    
    for (const ship of gameState.computerShips) {
        if (ship.positions.some(p => p.x === x && p.y === y)) {
            hit = true;
            ship.hits.add(attackKey);
            
            // Verifica se afundou o navio
            if (ship.hits.size === ship.positions.length) {
                sunkShip = ship;
            }
            break;
        }
    }
    
    // Atualiza display
    updateGrids();
    
    // Verifica vitória
    const allComputerShipsSunk = gameState.computerShips.every(ship => 
        ship.hits.size === ship.positions.length
    );
    
    if (allComputerShipsSunk) {
        gameState.gameOver = true;
        gameStatus.textContent = "★ Parabéns! Você afundou todos os navios do computador! ★";
        return true;
    }
    
    // Dar feedback
    if (sunkShip) {
        gameStatus.textContent = `Você afundou o ${sunkShip.name} do computador!`;
    } else if (hit) {
        gameStatus.textContent = `Acertou em (${x},${y})!`;
    } else {
        gameStatus.textContent = `Água em (${x},${y}).`;
    }
    
    return true;
}

// Processar ataque (IA simples)
function computerAttack() {
    if (gameState.gameOver) return;
    
    let x, y, attackKey;
    
    // IA simples: atacar aleatoriamente
    do {
        x = Math.floor(Math.random() * BOARD_SIZE) + 1;
        y = Math.floor(Math.random() * BOARD_SIZE) + 1;
        attackKey = `${x},${y}`;
    } while (gameState.computerAttacks.has(attackKey));
    
    // Registra ataque
    gameState.computerAttacks.add(attackKey);
    
    // Verificar se acertou algum navio
    // Arummar IA para quando acertar algum navio continuar atirando em volta para tentar afundar o navio
    // (não implementado nesta versão)
    let hit = false;
    let sunkShip = null;
    
    for (const ship of gameState.playerShips) {
        if (ship.positions.some(p => p.x === x && p.y === y)) {
            hit = true;
            ship.hits.add(attackKey);
            
            // Verificar se afundou o navio
            if (ship.hits.size === ship.positions.length) {
                sunkShip = ship;
            }
            break;
        }
    }
    
    // Atualiza display
    updateGrids();
    
    // Verificar derrota
    const allPlayerShipsSunk = gameState.playerShips.every(ship => 
        ship.hits.size === ship.positions.length
    );
    
    if (allPlayerShipsSunk) {
        gameState.gameOver = true;
        gameStatus.textContent = "☠️ O computador afundou todos os seus navios! ☠️";
        return;
    }
    
    // log
    if (sunkShip) {
        gameStatus.textContent += ` O computador afundou seu ${sunkShip.name}!`;
    } else if (hit) {
        gameStatus.textContent += ` O computador acertou em (${String.fromCharCode(64 + x)}${y}).`;
    } else {
        gameStatus.textContent += ` O computador errou.`;
    }
}

// entrada de coordenadas
function parseCoordinate(input) {
    // Remove espaços e converte para maiúsculas
    input = input.trim().toUpperCase();
    
    // Padrões aceitos: (x,y), x,y, A1, A 1, 
    const match = input.match(/^(?:\(?\s*([A-J]|\d+)\s*[, ]\s*([A-J]|\d+)\s*\)?|([A-J])\s*(\d+))$/);
    
    if (!match) return null;
    
    let x, y;
    
    if (match[3]) { // Formato A1
        x = match[3].charCodeAt(0) - 64;
        y = parseInt(match[4]);
    } else { // Formato (x,y)
        if (isNaN(match[1])) {
            x = match[1].charCodeAt(0) - 64;
        } else {
            x = parseInt(match[1]);
        }
        
        if (isNaN(match[2])) {
            y = match[2].charCodeAt(0) - 64;
        } else {
            y = parseInt(match[2]);
        }
    }
    
    // Validar coordenadas
    if (x < 1 || x > BOARD_SIZE || y < 1 || y > BOARD_SIZE) {
        return null;
    }
    
    return { x, y };
}

// Event Listeners
attackBtn.addEventListener('click', () => {
    const input = coordinateInput.value;
    const coord = parseCoordinate(input);
    
    if (!coord) {
        gameStatus.textContent = "Coordenada inválida! Use formato (x,y) ou A1 (ex: (3,5) ou C7)";
        return;
    }
    
    if (playerAttack(coord.x, coord.y)) {
        // Só permite ataque do computador se o jogo não acabou
        if (!gameState.gameOver) {
            setTimeout(computerAttack, 1000);
        }
    }
    
    coordinateInput.value = '';
    coordinateInput.focus();
});

coordinateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        attackBtn.click();
    }
});

restartBtn.addEventListener('click', initGame);

// Iniciar o jogo
initGame();