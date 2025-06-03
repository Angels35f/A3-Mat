function chooseAttack(type) {
    currentAttack = type;
    generateChallenge();
    document.getElementById('attack-options').classList.add('hidden');
    document.getElementById('challenge').classList.remove('hidden');
    tempoInicioDesafio = Date.now();

}

function generateChallenge() {
    if (currentAttack === 'determinant') {
        const a = randomNumber(), b = randomNumber(), c = randomNumber(), d = randomNumber();
        correctAnswer = a * d - b * c;
        document.getElementById('challenge-text').innerText = "Calcule o determinante:";
        document.getElementById('problem').innerText = `[ ${a} ${b} ]\n[ ${c} ${d} ]`;
    } else if (currentAttack === 'cartesian') {
        const A = ['a', 'b'], B = [1, 2];
        correctAnswer = A.length * B.length;
        document.getElementById('challenge-text').innerText = "Quantos elementos tem o produto cartesiano A × B?";
        document.getElementById('problem').innerText = `A = {a, b}\nB = {1, 2}`;
    } else if (currentAttack === 'function') {
        const m = randomNumber(2, 5), n = randomNumber(-5, 5), x = randomNumber(1, 10);
        correctAnswer = m * x + n;
        document.getElementById('challenge-text').innerText = "Calcule f(x):";
        document.getElementById('problem').innerText = `f(x) = ${m}x ${n >= 0 ? '+' : '-'} ${Math.abs(n)}\nOnde x = ${x}`;
    } else if (currentAttack === 'system') {
        const a1 = randomNumber(1, 5), b1 = randomNumber(1, 5);
        const a2 = randomNumber(1, 5), b2 = randomNumber(1, 5);
        const x = randomNumber(1, 5), y = randomNumber(1, 5);
        const c1 = a1 * x + b1 * y;
        const c2 = a2 * x + b2 * y;
        correctAnswer = `${x},${y}`;
        document.getElementById('challenge-text').innerText = "Resolva o sistema (responda x,y):";
        document.getElementById('problem').innerText = `${a1}x + ${b1}y = ${c1}\n${a2}x + ${b2}y = ${c2}`;
    }
}

function submitAnswer() {
    const userInput = document.getElementById('answer').value.trim();
    document.getElementById('answer').value = '';

if (currentAttack === 'system') {
    if (userInput.replace(/\s/g, '') === correctAnswer) {
        attackMonster(2);
    } else {
        takeDirectDamage();
    }
} else {
    if (parseInt(userInput) === correctAnswer) {
        attackMonster(currentAttack === 'cartesian' ? 2 : 1);
    } else {
        takeDirectDamage();
    }
    if (playerHP > 0 && monsterHP > 0) {
        setTimeout(turnoDoMonstro, 800); 
    }
}

function takeDirectDamage() {
    playerHP--;
    document.getElementById('result').innerHTML = '💥 Você errou! Levou dano direto!';
    updateStatus();
    checkGameOver();

    document.getElementById('challenge').classList.add('hidden');
    if (playerHP > 0) {
        document.getElementById('attack-options').classList.remove('hidden');
    }
}


    document.getElementById('challenge').classList.add('hidden');
    document.getElementById('attack-options').classList.remove('hidden');
}

function attackMonster(baseDamage) {
    let critChance = Math.random();
    let damage = baseDamage;

    if (critChance < 0.10) {
        damage = baseDamage * 2;
        document.getElementById('result').innerHTML = `💥 Ataque Crítico! Você causou ${damage} de dano!`;
    } else if (critChance < 0.25) {
        damage = Math.max(1, Math.floor(baseDamage * 0.5));
        document.getElementById('result').innerHTML = `😐 Ataque Fraco. Você causou apenas ${damage} de dano.`;
    } else {
        document.getElementById('result').innerHTML = `✅ Você causou ${damage} de dano!`;
    }

    monsterHP -= damage;
    flashDamage('monster-health-bar');
    updateStatus();
    checkGameOver();
}

let defenseTimeout = null;

function monsterAttack() {
    document.getElementById('attack-options').classList.add('hidden');
    document.getElementById('defense').classList.remove('hidden');

    const a = randomNumber(1, 5);
    const b = randomNumber(1, 5);
    const c = randomNumber(1, 5);

    const useParentheses = Math.random() > 0.5;

    if (useParentheses) {
        defenseAnswer = (a + b) * c;
        document.getElementById('defense-problem').innerText = `(${a} + ${b}) × ${c} = ?`;
    } else {
        defenseAnswer = a + (b * c);
        document.getElementById('defense-problem').innerText = `${a} + (${b} × ${c}) = ?`;
    }

    // Inicia o cronômetro de defesa (15 segundos)
    defenseTimeout = setTimeout(() => {
        document.getElementById('defense').classList.add('hidden');
        playerHP--;
        document.getElementById('result').innerHTML = '⏱️ Tempo esgotado! Defesa falhou!';
        updateStatus();
        checkGameOver();

        if (playerHP > 0) {
            document.getElementById('attack-options').classList.remove('hidden');
        }
    }, 15000);
}

function submitDefense() {
    clearTimeout(defenseTimeout); 
    const userInput = document.getElementById('defense-answer').value.trim();
    document.getElementById('defense-answer').value = '';

    if (parseInt(userInput) === defenseAnswer) {
        document.getElementById('result').innerHTML = '🛡️ Defesa bem-sucedida!';
    } else {
        playerHP--;
        document.getElementById('result').innerHTML = '💥 Defesa falhou!';
        updateStatus();
        checkGameOver();
    }

    document.getElementById('defense').classList.add('hidden');
    if (playerHP > 0) {
        document.getElementById('attack-options').classList.remove('hidden');
    }
}


function useMagic() {
  if (usosDeCura <= 0) {
    document.getElementById('result').innerHTML = "⚠️ Você não tem mais usos de cura!";
    return;
  }

  if (playerHP < maxPlayerHP) {
    playerHP++;
    usosDeCura--;
    document.getElementById('result').innerHTML = "✨ Magia de cura usada! (+1 HP)";
    flashHeal('player-health-bar');
    updateStatus();
  } else {
    document.getElementById('result').innerHTML = "❤️ Sua vida já está cheia!";
  }
}

// Quando o jogador ou monstro sofre dano
flashDamage('player-health-bar');
// ou
flashDamage('monster-health-bar');

function evadeChallenge() {
    document.getElementById('challenge').classList.add('hidden');
    monsterAttack(); // ativa a defesa como se fosse um ataque inimigo
}

function ataqueDebug() {
    const dano = 99;
    monsterHP -= dano;
    document.getElementById('result').innerHTML = `🛠️ Ataque Debug causou ${dano} de dano!`;
    flashDamage('monster-health-bar');
    updateStatus();
    checkGameOver();
}

