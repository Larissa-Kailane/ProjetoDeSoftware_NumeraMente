import { Link } from "react-router-dom";
import './Duvidas.css'


function YarnBall({ base = "#1f8a5b", dark = "#0f6b43", light = "#3fae80", className, idSuffix = "a" }) {
  const clip = `yarn-clip-${idSuffix}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle cx="30" cy="30" r="24" />
        </clipPath>
      </defs>
      <circle cx="30" cy="30" r="24" fill={base} />
      <g clipPath={`url(#${clip})`} fill="none" strokeLinecap="round">
        <path d="M2 18 C20 8 40 10 60 22" stroke={dark} strokeWidth="3" />
        <path d="M0 28 C22 18 42 22 62 32" stroke={light} strokeWidth="2.5" />
        <path d="M2 38 C22 30 44 34 60 44" stroke={dark} strokeWidth="3" />
        <path d="M6 50 C24 42 42 46 58 54" stroke={light} strokeWidth="2.5" />
        <path d="M14 4 C10 22 14 42 26 58" stroke={dark} strokeWidth="2.5" />
        <path d="M30 2 C26 22 30 42 42 58" stroke={light} strokeWidth="2.5" />
        <path d="M46 6 C42 22 46 40 54 52" stroke={dark} strokeWidth="2.5" />
      </g>
      <path
        d="M44 50 C50 58 56 58 60 56 C62 55 63 56 62 57"
        stroke={base}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M16 4h8v12h12v8H24v12h-8V24H4v-8h12z"
        fill="#fff"
        stroke="rgba(0,0,0,.12)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Cursor({ style }) {
  return (
    <svg className="cf-cursor" style={style} viewBox="0 0 44 56" aria-hidden="true">
      <path
        d="M4 2 L4 40 L14 31 L22 50 L30 46 L22 28 L36 28 Z"
        fill="#fff"
        stroke="#1b1b1b"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Duvidas() {
  return (
    <main className="cf-page">

      <header className="cf-header">
        <YarnBall
          className="cf-logo"
          base="#8a4a45"
          dark="#4d2a2c"
          light="#b9736b"
          idSuffix="logo"
        />
        <p className="cf-brand">NUMERAMENTE</p>
      </header>

      <h1 className="cf-title">Como funciona?</h1>

      <section className="cf-grid">
        {/* 1 - Escolhendo uma operação */}
        <div className="cf-col">
          <h2>Escolhendo uma operação</h2>
          <div className="cf-card">
            <p>
              Escolha uma das operações presentes no menu de cima, para trocar a
              operação que deseja, basta clicar no seu botão colorido na barra
              de menu.
            </p>
            <p>
              <strong>Cada operação tem a sua própria cor!</strong>
            </p>
            <div className="cf-demo center">
              <button type="button" className="cf-op" tabIndex={-1}>
                <PlusIcon />
                Adição
              </button>
              <Cursor style={{ right: "-6px", bottom: "-14px", transform: "translateX(40%)" }} />
            </div>
          </div>
        </div>

        {/* 2 - Realizando o cálculo */}
        <div className="cf-col">
          <h2>Realizando o cálculo</h2>
          <div className="cf-card">
            <p>
              Insira os números que deseja para a operação nos campos em
              branco, após, clique em calcular e veja a mágica acontecer!
            </p>
            <p>
              <strong>Você pode calcular até 2 números por vez.</strong>
            </p>
            <div className="cf-demo">
              <input
                className="cf-input"
                type="number"
                placeholder="Insira um número"
                aria-label="Insira um número"
              />
              <button type="button" className="cf-calc" tabIndex={-1}>
                Calcular
                <Cursor style={{ right: "-30px", bottom: "-34px" }} />
              </button>
            </div>
          </div>
        </div>

        {/* 3 - Resultado */}
        <div className="cf-col">
          <h2>Resultado</h2>
          <div className="cf-card">
            <p>
              Ao clicar no botão "Calcular", o resultado da operação será
              mostrado visualmente na tela como bolas de lã.
            </p>
            <p>
              <strong>
                As bolas de lã representarão a quantidade que cada número
                corresponde.
              </strong>
            </p>
            <div className="cf-demo center" style={{ width: "100%" }}>
              <div className="cf-result" role="img" aria-label="5 bolas de lã">
                {[0, 1, 2, 3, 4].map((i) => (
                  <YarnBall key={i} idSuffix={`r${i}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}