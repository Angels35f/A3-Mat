let modoDebug = false;


let regioesConcluidas = [];


let regiaoAtualIndex = 0;
let regiaoAtual = null;

let vitoriasNaRegiao = 0;
let chefeAtivo = false;

let lojaAberta = false;

let playerHP = 3;
let maxPlayerHP = 3;
let monsterHP = 3;
let maxMonsterHP = 3;
let level = 1;
let xp = 0;
let xpParaProximoNivel = 5;
let usosDeCura = 0;
let curaMaximaPorMasmorra = 1;


let currentAttack = '';
let correctAnswer = 0;
let defenseAnswer = 0;
let magicUsed = false;



const regioes = [
  {
    nome: "🌲 Floresta Sombria",
    dificuldadeBase: 0.1,
    chefao: {
      name: "Árvore Anciã",
      hp: 6,
      xp: 6,
      acerto: 0.6,
      imagem: "imagens/arvore_ancia.png"
    },
    monstros: [
      { name: "Slime", hp: 3, xp: 2, acerto: 0.3, imagem: "imagens/slime.png" },
      { name: "Morcego Sombrio", hp: 2, xp: 1, acerto: 0.4, imagem: "imagens/morcego_sombrio.png" },
      { name: "Goblin", hp: 4, xp: 4, acerto: 0.5, imagem: "imagens/goblin.png" }
    ]
  },
  {
    nome: "💀 Catacumbas",
    dificuldadeBase: 0.2,
    chefao: {
      name: "Rei Esqueleto",
      hp: 8,
      xp: 10,
      acerto: 0.6,
      imagem: "imagens/rei_esqueleto.png"
    },
    monstros: [
      { name: "Esqueleto", hp: 4, xp: 3, acerto: 0.5, imagem: "imagens/esqueleto.png" },
      { name: "Mímico", hp: 5, xp: 7, acerto: 0.55, imagem: "imagens/mimico.png" },
      { name: "Bruxa da Álgebra", hp: 6, xp: 8, acerto: 0.6, imagem: "imagens/bruxa_algebra.png" }
    ]
  },
  {
    nome: "⛰ Caverna Rochosa",
    dificuldadeBase: 0.25,
    chefao: {
      name: "Titã de Granito",
      hp: 10,
      xp: 12,
      acerto: 0.65,
      imagem: "imagens/tita_granito.png"
    },
    monstros: [
      { name: "Golem de Pedra", hp: 6, xp: 6, acerto: 0.5, imagem: "imagens/golem_pedra.png" },
      { name: "Orc", hp: 5, xp: 5, acerto: 0.6, imagem: "imagens/orc.png" },
      { name: "Hidra Binária", hp: 8, xp: 10, acerto: 0.7, imagem: "imagens/hidra_binaria.png" }
    ]
  },
  {
    nome: "🌀 Torre do Cálculo",
    dificuldadeBase: 0.3,
    chefao: {
      name: "Senhor dos Números",
      hp: 12,
      xp: 15,
      acerto: 0.75,
      imagem: "imagens/senhor_numeros.png"
    },
    monstros: [
      { name: "Guardião Vetorial", hp: 9, xp: 12, acerto: 0.65, imagem: "imagens/guardiao_vetorial.png" },
      { name: "Dragão", hp: 7, xp: 8, acerto: 0.7, imagem: "imagens/dragao.png" },
      { name: "Lorde das Matrizes", hp: 10, xp: 12, acerto: 0.8, imagem: "imagens/lorde_matrizes.png" }
    ]
  }
];


let monstroAtual = null;
let tempoInicioDesafio = 0;

function entrarNaMasmorra() {
  magicUsed = false;
  playerHP = maxPlayerHP = 3;
  monsterHP = maxMonsterHP = 3;
  level = 1;
  xp = 0;
  xpParaProximoNivel = calcularXPParaNivel(level);
  regiaoAtualIndex = 0;
  regiaoAtual = regioes[regiaoAtualIndex];

  spawnMonstroAleatorio();
  document.getElementById('regiao-atual').innerText = regiaoAtual.nome;
}

function spawnMonstroAleatorio() {
  if (!chefeAtivo && vitoriasNaRegiao >= 3) {
    configurarMonstro({ ...regiaoAtual.chefao }, true);
    chefeAtivo = true;
  } else {
    const lista = regiaoAtual.monstros;
    const aleatorio = lista[Math.floor(Math.random() * lista.length)];
    configurarMonstro({ ...aleatorio });
  }
  showMonsterArt(monstroAtual.nome);
   

}


function configurarMonstro(dados, isBoss = false) {
  monstroAtual = dados;
  monsterHP = dados.hp;
  maxMonsterHP = dados.hp;

  showMonsterArt(dados.name);
  document.getElementById('monster-name').innerText = isBoss ? dados.name + " 👑" : dados.name;

  document.getElementById('magic-button').disabled = false;
  updateStatus();
  document.getElementById('attack-options').classList.remove('hidden');
  showMonsterArt(monstroAtual.nome);


  const imagemEl = document.getElementById("monster-image");
  if (monstroAtual.imagem) {
    imagemEl.src = monstroAtual.imagem;
    imagemEl.classList.remove("hidden");
  } else {
    imagemEl.classList.add("hidden");
  }
}


function calcularXPParaNivel(nivel) {
  return Math.floor(5 * Math.pow(1.5, nivel - 1));
}


function checkGameOver() {
  if (monsterHP <= 0) {
    document.getElementById('result').innerHTML += '<br>🏆 Monstro derrotado!';
    let ganhoBase = monstroAtual?.xp || 3;
    let tempoResposta = (Date.now() - tempoInicioDesafio) / 1000;
    let bonusVelocidade = tempoResposta <= 5 ? 1 : 0;

    xp += ganhoBase + bonusVelocidade;

    let mensagemXP = `🧠 Você ganhou ${ganhoBase} XP`;
    if (bonusVelocidade) mensagemXP += ` +1 de bônus por velocidade!`;
    document.getElementById('result').innerHTML += `<br>${mensagemXP}`;

    if (xp >= xpParaProximoNivel) {
      level++;
      xp = 0;
      xpParaProximoNivel = calcularXPParaNivel(level);

      abrirLoja(); 
    }
    else {
      setTimeout(spawnMonstroAleatorio, 1500);
    }

    if (chefeAtivo) {
      document.getElementById('result').innerHTML += `<br>👑 Chefe derrotado! Você conquistou a região ${regiaoAtual.nome}!`;
      chefeAtivo = false;

      if (!regioesConcluidas.includes(regiaoAtualIndex)) {
        regioesConcluidas.push(regiaoAtualIndex);
      }

      setTimeout(() => {
        document.getElementById('game').classList.add('hidden');
        document.getElementById('escolha-regiao').classList.remove('hidden');
        atualizarBotoesRegioes();
      }, 2000);
    } else {
      vitoriasNaRegiao++;
      if (!lojaAberta) {
        setTimeout(spawnMonstroAleatorio, 1500);
      }

    }
    if (regioesConcluidas.length >= regioes.length) {
      setTimeout(mostrarTelaVitoria, 2000);
    }

    if (modoAtual === 'endless') {
      vitoriasEndless++;

      if (vitoriasEndless % 3 === 0) {
        abrirLoja(); // Loja a cada 3 vitórias
      } else {
        setTimeout(spawnMonstroEndless, 1500);
      }
    }




  } else if (playerHP <= 0) {
    document.getElementById('attack-options').classList.add('hidden');
    document.getElementById('result').innerHTML = '☠️ Você foi derrotado!';
    setTimeout(() => {
      mostrarGameOver();
    }, 1000);
  }
}


function aplicarUpgrade(tipo) {
  lojaAberta = false;
  const loja = document.getElementById('loja');
  loja.classList.add('hidden');

  if (tipo === "vida") {
    maxPlayerHP += 1;
    playerHP = maxPlayerHP;
  } else if (tipo === "cura") {
    usosDeCura += 1;
  } else if (tipo === "magia") {
    magicUsed = false;
  } else if (tipo === "nivel") {
    xp = xpParaProximoNivel;
  }

  document.getElementById('result').innerHTML = '🛒 Upgrade aplicado!';
  updateStatus();

  if (modoAtual === "endless") {
  setTimeout(spawnMonstroEndless, 1500);
  } else {
    setTimeout(spawnMonstroAleatorio, 1500);
  }

}




function abrirLoja() {
  lojaAberta = true;
  const loja = document.getElementById('loja');
  loja.classList.remove('hidden');

  document.getElementById('attack-options')?.classList.add('hidden');
  document.getElementById('challenge')?.classList.add('hidden');
  document.getElementById('defense')?.classList.add('hidden');
  document.getElementById('magic-button')?.setAttribute("disabled", true);
}




function escolherRegiao(index) {
  regiaoAtualIndex = index;
  regiaoAtual = regioes[regiaoAtualIndex];

  
  playerHP = maxPlayerHP; // restaura a vida atual para o máximo
  monsterHP = maxMonsterHP = 3;
  usosDeCura = curaMaximaPorMasmorra;


  vitoriasNaRegiao = 0;
  chefeAtivo = false;
  magicUsed = false;

  document.getElementById("escolha-regiao").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById('regiao-atual').innerText = regiaoAtual.nome;

  spawnMonstroAleatorio();
}



function turnoDoMonstro() {
  const chanceBase = regiaoAtual.dificuldadeBase || 0;
  const chanceMonstro = monstroAtual.acerto || 0.3;
  const chanceFinal = chanceBase + chanceMonstro;

  const acertou = Math.random() < chanceFinal;

  if (acertou) {
    playerHP--;
    document.getElementById('result').innerHTML += `<br>💢 ${monstroAtual.name} atacou você com sucesso! (-1 HP)`;
    flashDamage('player-health-bar');
    updateStatus();
    checkGameOver();
  } else {
    document.getElementById('result').innerHTML += `<br>😅 ${monstroAtual.name} tentou atacar, mas errou!`;
  }
}

function atualizarBotoesRegioes() {
  const botoes = document.querySelectorAll('#escolha-regiao button');

  botoes.forEach((botao, index) => {
    if (regioesConcluidas.includes(index)) {
      botao.innerText = "✅ " + regioes[index].nome;
      botao.style.backgroundColor = '#222';
      botao.style.color = '#0f0';
    } else {
      botao.innerText = regioes[index].nome;
      botao.style.backgroundColor = ''; // reset
      botao.style.color = '';
    }
  });
}

function mostrarGameOver() {
  document.getElementById('game-over-screen').classList.remove('hidden');
  document.getElementById('attack-options')?.classList.add('hidden');
  document.getElementById('magic-button')?.setAttribute("disabled", true);
  document.getElementById('challenge')?.classList.add('hidden');
  document.getElementById('defense')?.classList.add('hidden');
}

function voltarParaSelecao() {
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('title-screen').classList.remove('hidden');

  // Resetar variáveis de interface
  document.getElementById('game').classList.add('hidden');
  document.getElementById('ascii-art').innerText = '';
  document.getElementById('challenge').classList.add('hidden');
  document.getElementById('attack-options').classList.add('hidden');
  document.getElementById('defense').classList.add('hidden');
  document.getElementById('result').innerHTML = '';
}


function mostrarTelaVitoria() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('escolha-regiao').classList.add('hidden');
  document.getElementById('tela-vitoria').classList.remove('hidden');
}

function voltarParaMenu() {
  document.getElementById('tela-vitoria').classList.add('hidden');
  document.getElementById('title-screen').classList.remove('hidden');
}


















