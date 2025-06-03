import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
import Header from "./Header";

// Registro dos elementos do Chart.js
Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

// Dados reais simplificados para o gráfico do clima (exemplo fictício)
const dadosClima = [
  { ano: 2000, temp: 22.1 },
  { ano: 2002, temp: 22.3 },
  { ano: 2004, temp: 22.5 },
  { ano: 2006, temp: 22.7 },
  { ano: 2008, temp: 22.9 },
  { ano: 2010, temp: 23.0 },
  { ano: 2012, temp: 23.2 },
  { ano: 2014, temp: 23.4 },
  { ano: 2016, temp: 23.7 },
  { ano: 2018, temp: 23.9 },
  { ano: 2020, temp: 24.1 }
];

export default function Graficos() {
  // Gráfico matemático
  const [tipo, setTipo] = useState("linear");
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [pontoSelecionado, setPontoSelecionado] = useState(null);

  // Gráfico do clima
  const [fatorClima, setFatorClima] = useState(0.02);

  // Dados para o gráfico matemático
  const xValues = Array.from({ length: 21 }, (_, i) => i - 10);
  const yValues = xValues.map(x => {
    if (tipo === "linear") return a * x + b;
    if (tipo === "quadratic") return a * x * x + b * x + c;
    if (tipo === "seno") return a * Math.sin(b * x + c);
    return 0;
  });

  const chartColor = "#4FC3F7";

  const data = {
    labels: xValues,
    datasets: [
      {
        label:
          tipo === "linear"
            ? "y = ax + b"
            : tipo === "quadratic"
            ? "y = ax² + bx + c"
            : "y = a·sen(bx + c)",
        data: yValues,
        fill: false,
        borderColor: chartColor,
        backgroundColor: chartColor,
        tension: 0.1,
        pointRadius: 4,
        pointBackgroundColor: chartColor,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: { color: "#4FC3F7" }
      },
      tooltip: {
        enabled: false
      }
    },
    onClick: (event, elements, chart) => {
      if (elements && elements.length > 0) {
        const idx = elements[0].index;
        setPontoSelecionado({
          x: xValues[idx],
          y: yValues[idx]
        });
      } else {
        setPontoSelecionado(null);
      }
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#333" }
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#333" }
      }
    }
  };

  function getExpressao(x, y) {
    if (tipo === "linear") {
      return `y = ${a}·${x} + ${b} = ${y.toFixed(2)}`;
    }
    if (tipo === "quadratic") {
      return `y = ${a}·${x}² + ${b}·${x} + ${c} = ${y.toFixed(2)}`;
    }
    if (tipo === "seno") {
      return `y = ${a}·sen(${b}·${x} + ${c}) = ${y.toFixed(2)}`;
    }
    return "";
  }

  // Dados para o gráfico do clima
  const anos = dadosClima.map(d => d.ano);
  const temperaturas = dadosClima.map((d, i) =>
    (d.temp + fatorClima * (i))
  );

  const dataClima = {
    labels: anos,
    datasets: [
      {
        label: "Temperatura média anual (°C)",
        data: temperaturas,
        fill: false,
        borderColor: "#FF7043",
        backgroundColor: "#FF7043",
        tension: 0.2,
        pointRadius: 4,
        pointBackgroundColor: "#FF7043"
      }
    ]
  };

  const optionsClima = {
    plugins: {
      legend: { labels: { color: "#FF7043" } }
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "#333" } },
      y: { ticks: { color: "#fff" }, grid: { color: "#333" } }
    }
  };

  return (
    <>
      <Header
        background="#222831"
        textColor="#4FC3F7"
        sobreContent={
          <div>
            <h2>Sobre os Gráficos</h2>
            <p>
              Esta seção de gráficos interativos foi criada por <strong>Angel Santiago Fernandez Pataquiva</strong>
            </p>
          </div>
        }
      />

      {/* Gráfico matemático */}
      <div
        style={{
          maxWidth: 600,
          margin: "120px auto 40px auto",
          background: "#111",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          position: "relative"
        }}
      >
        <h2 style={{ color: "#4FC3F7", marginBottom: 8 }}>Gráficos Matemáticos</h2>
        <p style={{ color: "#b0bec5", marginBottom: 24, fontSize: 15 }}>
          Explore funções do 1º e 2º grau e funções trigonométricas. Clique em um ponto do gráfico para ver o valor exato.
        </p>
        <div style={{ marginBottom: 16, color: "#e0f7fa" }}>
          <label>
            <input
              type="radio"
              checked={tipo === "linear"}
              onChange={() => { setTipo("linear"); setPontoSelecionado(null); }}
            />{" "}
            Função do 1º grau (y = ax + b)
          </label>
          <label style={{ marginLeft: 16 }}>
            <input
              type="radio"
              checked={tipo === "quadratic"}
              onChange={() => { setTipo("quadratic"); setPontoSelecionado(null); }}
            />{" "}
            Função do 2º grau (y = ax² + bx + c)
          </label>
          <label style={{ marginLeft: 16 }}>
            <input
              type="radio"
              checked={tipo === "seno"}
              onChange={() => { setTipo("seno"); setPontoSelecionado(null); }}
            />{" "}
            Função seno (y = a·sen(bx + c))
          </label>
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <label>
            a:{" "}
            <input
              type="number"
              value={a}
              onChange={e => { setA(Number(e.target.value)); setPontoSelecionado(null); }}
              style={{ width: 60 }}
            />
          </label>
          <label>
            b:{" "}
            <input
              type="number"
              value={b}
              onChange={e => { setB(Number(e.target.value)); setPontoSelecionado(null); }}
              style={{ width: 60 }}
            />
          </label>
          {(tipo === "quadratic" || tipo === "seno") && (
            <label>
              c:{" "}
              <input
                type="number"
                value={c}
                onChange={e => { setC(Number(e.target.value)); setPontoSelecionado(null); }}
                style={{ width: 60 }}
              />
            </label>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <Line data={data} options={options} />
          {pontoSelecionado && (
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "#23272f",
                color: "#4FC3F7",
                padding: "10px 18px",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                fontSize: 16,
                zIndex: 10,
                minWidth: 180
              }}
            >
              <strong>Ponto selecionado:</strong>
              <br />
              x = {pontoSelecionado.x}, y = {pontoSelecionado.y.toFixed(2)}
              <br />
              {getExpressao(pontoSelecionado.x, pontoSelecionado.y)}
            </div>
          )}
        </div>
      </div>

      {/* Separador */}
      <div style={{
        maxWidth: 600,
        margin: "0 auto 40px auto",
        textAlign: "center"
      }}>
        <hr style={{ border: "none", borderTop: "2px solid #333", margin: "40px 0 32px 0" }} />
      </div>

      {/* Gráfico do clima */}
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto 40px auto",
          background: "#111",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ color: "#FF7043", marginBottom: 8 }}>Gráfico do Clima</h2>
        <p style={{ color: "#ffab91", marginBottom: 24, fontSize: 15 }}>
          Exemplo real: Temperatura média anual de uma cidade fictícia. Ajuste o fator de aquecimento global para ver como a temperatura mudaria ao longo dos anos!
        </p>
        <div style={{ marginBottom: 16, color: "#e0f7fa" }}>
          <label>
            Fator de aquecimento global (°C por ano):{" "}
            <input
              type="number"
              step="0.01"
              value={fatorClima}
              onChange={e => setFatorClima(Number(e.target.value))}
              style={{ width: 80 }}
            />
          </label>
        </div>
        <Line data={dataClima} options={optionsClima} />
      </div>
    </>
  );
}