function Sidebar({ onAbrirJogo, onAbrirPalavrasC }) {
  return (
    <div className="sidebar">
      <div className="content_1">
        <div className="button-group">
          <button className="botão_1" onClick={onAbrirJogo}>Abrir Jogo</button>
          <button className="botão_2" onClick={onAbrirPalavrasC}>Abrir PalavrasC</button>
          <button className="botão_3">Opção 3</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;