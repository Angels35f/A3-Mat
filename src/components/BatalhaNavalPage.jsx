import Header from "./Header";

export default function BatalhaNavalPage() {
  return (
    <>
      <Header
         background="#b0b0b0" 
          textColor="#222"  
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
          src="/batalha/index.html"
          title="Batalha Naval"
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