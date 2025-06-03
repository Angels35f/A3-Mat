// endless.js

// Variáveis específicas do modo Endless
let modoAtual = 'normal';
let vitoriasEndless = 0;


function modoSemFim() {
  document.getElementById('title-screen').classList.add('hidden');

  iniciarModoEndless();
}

// Inicia o modo Endless
function iniciarModoEndless() {
  modoAtual = 'endless';
  document.getElementById('game').classList.remove('hidden');

    if (modoDebug) {
    document.getElementById("debug-button")?.classList.remove("hidden");
    }

  document.getElementById('result').innerHTML = '🌌 Modo Endless iniciado!';
  
  playerHP = maxPlayerHP;
  usosDeCura = curaMaximaPorMasmorra;
  vitoriasEndless = 0;

  updateStatus();
  spawnMonstroEndless();
}

// Gera um monstro aleatório de todas as regiões
function spawnMonstroEndless() {
  const todasRegioes = regioes.flatMap(r => r.monstros);
  const baseMonstro = escolherMonstro(todasRegioes);
  const escala = Math.floor(vitoriasEndless / 5); // a cada 5 vitórias aumenta o tier

  monstroAtual = {
    ...baseMonstro,
    hp: baseMonstro.hp + escala,
    xp: baseMonstro.xp + Math.floor(escala / 2),
    acerto: Math.min((baseMonstro.acerto || 0.3) + escala * 0.05, 0.95) // máx. 95%
  };

  chefeAtivo = false;
  monsterHP = monstroAtual.hp;
  maxMonsterHP = monstroAtual.hp;

  configurarMonstro(monstroAtual);
  showMonsterArt(monstroAtual.nome);

}

function mostrarEscolhaBuff() {
  document.getElementById("buff-escolha").classList.remove("hidden");
  const container = document.getElementById("buff-opcoes");
  container.innerHTML = '';

  buffsDisponiveis.forEach(buff => {
    const btn = document.createElement("button");
    btn.textContent = buff.nome;
    btn.onclick = () => {
      buff.efeito();
      document.getElementById("buff-escolha").classList.add("hidden");
      setTimeout(spawnMonstroEndless, 1000);
    };
    container.appendChild(btn);
  });
}

