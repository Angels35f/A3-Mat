let monsterArts = {};


function showMonsterArt(name) {
    document.getElementById('ascii-art').innerText = monsterArts[name] || '';
}

function showMonsterArt(monstro) {
  if (!monstro || !monstro.arte) return;
  fetch(monstro.arte)
    .then(res => res.text())
    .then(arte => {
      document.getElementById('ascii-art').innerText = arte;
    })
    .catch(err => {
      console.error("Erro ao carregar arte:", err);
      document.getElementById('ascii-art').innerText = "";
    });
}

