function updateStatus() {
    updateHealthBar('player-health-bar', playerHP, maxPlayerHP);
    updateHealthBar('monster-health-bar', monsterHP, maxMonsterHP);

    document.getElementById('level').innerText = level;

    
    document.getElementById('xp').innerText = xp;
    document.getElementById('xpParaProximoNivel').innerText = xpParaProximoNivel;

    document.getElementById('magic-button').innerText = `Usar Magia (Cura) - ${usosDeCura} uso(s) restante(s)`;


    updateHealthStatusText();
}

function updateHealthBar(id, hp, maxHp) {
    const bar = document.getElementById(id);
    const percent = Math.max((hp / maxHp) * 100, 0);
    bar.style.width = percent + '%';
    
   
    if (percent > 70) {
        bar.style.background = 'linear-gradient(to right, #4CAF50, #2E7D32)'; 
    } else if (percent > 30) {
        bar.style.background = 'linear-gradient(to right, #FFEB3B, #FBC02D)'; 
    } else {
        bar.style.background = 'linear-gradient(to right, #f44336, #b71c1c)'; 
    }

    // Mostra o texto de vida
    bar.innerText = `${hp}/${maxHp}`;
}

function flashDamage(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.style.backgroundColor = 'darkred';
  setTimeout(() => {
    el.style.backgroundColor = '';
  }, 300);
}


function updateHealthStatusText() {
    const status = document.getElementById('result');
    const percent = playerHP / maxPlayerHP;

    if (percent >= 0.8) {
        status.innerHTML += "<br>🟢 Você está saudável.";
    } else if (percent >= 0.4) {
        status.innerHTML += "<br>🟡 Você está machucado.";
    } else {
        status.innerHTML += "<br>🔴 Você está gravemente ferido!";
    }
}
