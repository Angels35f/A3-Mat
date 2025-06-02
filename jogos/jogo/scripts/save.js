// save.js

function salvarJogo(slot = 1) {
  const dados = {
    level: typeof level !== 'undefined' ? level : 1,
    xp: typeof xp !== 'undefined' ? xp : 0,
    xpParaProximoNivel: typeof xpParaProximoNivel !== 'undefined' ? xpParaProximoNivel : 5,
    maxPlayerHP: typeof maxPlayerHP !== 'undefined' ? maxPlayerHP : 10,
    playerHP: typeof playerHP !== 'undefined' ? playerHP : 10,
    usosDeCura: typeof usosDeCura !== 'undefined' ? usosDeCura : 1,
    curaMaximaPorMasmorra: typeof curaMaximaPorMasmorra !== 'undefined' ? curaMaximaPorMasmorra : 1,
    regioesConcluidas: typeof regioesConcluidas !== 'undefined' ? regioesConcluidas : [],
    modoAtual: typeof modoAtual !== 'undefined' ? modoAtual : 'normal',
    danoBonus: typeof danoBonus !== 'undefined' ? danoBonus : 0,
    xpBonus: typeof xpBonus !== 'undefined' ? xpBonus : 0,
    curaPorVitoria: typeof curaPorVitoria !== 'undefined' ? curaPorVitoria : false,
    vitoriasEndless: typeof vitoriasEndless !== 'undefined' ? vitoriasEndless : 0,
    dataHora: new Date().toLocaleString(),
    nomeModo: typeof modoAtual !== 'undefined' && modoAtual === "endless" ? "Endless" : "Normal"
  };

  localStorage.setItem(`progressoRPG_slot${slot}`, JSON.stringify(dados));
  mostrarConfirmacaoSalvo();
  atualizarVisaoSlots();
}

function carregarJogo(slot = 1) {
  const dados = JSON.parse(localStorage.getItem(`progressoRPG_slot${slot}`));
  if (!dados) {
    alert("Nenhum progresso salvo neste slot.");
    return;
  }

  level = dados.level;
  xp = dados.xp;
  xpParaProximoNivel = dados.xpParaProximoNivel;
  maxPlayerHP = dados.maxPlayerHP;
  playerHP = dados.playerHP;
  usosDeCura = dados.usosDeCura;
  curaMaximaPorMasmorra = dados.curaMaximaPorMasmorra;
  regioesConcluidas = dados.regioesConcluidas || [];
  modoAtual = dados.modoAtual || 'normal';
  danoBonus = dados.danoBonus || 0;
  xpBonus = dados.xpBonus || 0;
  curaPorVitoria = dados.curaPorVitoria || false;
  vitoriasEndless = dados.vitoriasEndless || 0;

  document.getElementById("title-screen").classList.add("hidden");

  if (modoAtual === "endless") {
    iniciarModoEndless();
  } else {
    document.getElementById("escolha-regiao").classList.remove("hidden");
    atualizarBotoesRegioes();
  }
}

function exportarProgresso(slot = 1) {
  const dados = localStorage.getItem(`progressoRPG_slot${slot}`);
  if (!dados) {
    alert("Nada salvo nesse slot.");
    return;
  }
  const blob = new Blob([dados], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `progresso_rpg_slot${slot}.json`;
  a.click();
}

function importarProgresso(slot = 1, file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const dados = JSON.parse(reader.result);
      localStorage.setItem(`progressoRPG_slot${slot}`, JSON.stringify(dados));
      alert("Progresso importado com sucesso!");
      atualizarVisaoSlots();
    } catch {
      alert("Arquivo inválido.");
    }
  };
  reader.readAsText(file);
}

function apagarSlot(slot = 1) {
  const confirmar = confirm(`Deseja apagar o Slot ${slot}?`);
  if (confirmar) {
    localStorage.removeItem(`progressoRPG_slot${slot}`);
    atualizarVisaoSlots();
  }
}

function atualizarVisaoSlots() {
  for (let i = 1; i <= 3; i++) {
    const dados = JSON.parse(localStorage.getItem(`progressoRPG_slot${i}`));
    const info = document.getElementById(`info-slot${i}`);
    if (info) {
      info.textContent = dados
        ? `📅 ${dados.dataHora} | 🎮 Modo: ${dados.nomeModo}`
        : '⏳ Sem dados';
    }
  }
}

function abrirGerenciadorSaves() {
  atualizarVisaoSlots();
  document.getElementById('gerenciador-saves')?.classList.remove('hidden');
}

function fecharGerenciadorSaves() {
  document.getElementById('gerenciador-saves')?.classList.add('hidden');
}

function mostrarConfirmacaoSalvo() {
  const el = document.getElementById("confirmacao-salvo");
  if (!el) return;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 2000);
}

function salvarESair() {
  salvarJogo(1); 
  voltarParaTelaInicial();
}

function voltarParaTelaInicial() {
  document.getElementById("game")?.classList.add("hidden");
  document.getElementById("tela-loja")?.classList.add("hidden");
  document.getElementById("escolha-regiao")?.classList.add("hidden");
  document.getElementById("tela-gameover")?.classList.add("hidden");
  document.getElementById("tela-vitoria")?.classList.add("hidden");
  document.getElementById("title-screen")?.classList.remove("hidden");
  document.getElementById("debug-button")?.classList.add("hidden");

  modoAtual = 'normal';
}
