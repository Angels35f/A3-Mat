import Header from "./Header";

export default function Dungeon() {
  return (
    <>
      <Header
        background="#000000" 
        textColor="#39FF14" 
        sobreContent={
          <div>
            <h2>Sobre este jogo</h2>
            <p>
              Este jogo foi feito por{" "}
              <strong>Lucas Henrique de Oliveira Piorino</strong>.
            </p>
          </div>
        }
      />
      <div style={{ marginTop: 100 }}>
        <iframe
          src={`${import.meta.env.BASE_URL}jogos/jogo/index.html`}
          title="Dungeon Game"
          style={{
            width: "100%",
            height: "90vh",
            border: "none",
            display: "block",
            margin: "0 auto",
          }}
        ></iframe>
      </div>
    </>
  );
}