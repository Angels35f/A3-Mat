function randomNumber(min = -5, max = 5) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function escolherMonstro(lista) {
  const index = Math.floor(Math.random() * lista.length);
  return lista[index];
}

