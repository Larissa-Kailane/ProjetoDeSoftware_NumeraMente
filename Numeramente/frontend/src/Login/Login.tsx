
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import gatoLivro from "../assets/gato.png";
import Circulo from "../assets/fundo_gato.png";
import Estrela from "../assets/estrela.png";

function YarnBall({
  base = "#8a4a45",
  dark = "#4d2a2c",
  light = "#b9736b",
  className,
  idSuffix = "login",
}: {
  base?: string;
  dark?: string;
  light?: string;
  className?: string;
  idSuffix?: string;
}) {
  const clip = `yarn-clip-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="30" cy="30" r="24" />
        </clipPath>
      </defs>

      <circle cx="30" cy="30" r="24" fill={base} />

      <g
        clipPath={`url(#${clip})`}
        fill="none"
        strokeLinecap="round"
      >
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

function Login() {
  const navegar = useNavigate();
  const [nome, setNome] = useState("");

  // leva o nome digitado para a saudação da tela da calculadora
  function comecar() {
    navegar("/calculadora", { state: { nome } });
  }

  return (
    <main className="login-container">

      {/* aqui vai a nossa logo assim como está na tela de duvidas*/}
      <header className="login-header">
        <YarnBall
          className="login-logo"
          base="#8a4a45"
          dark="#4d2a2c"
          light="#b9736b"
          idSuffix="login"
        />

        <p className="login-brand">NUMERAMENTE</p>
      </header>

      <section className="login-content">

        {/* aqui estão os textos da nossa página login */}
        <div className="texto-inicial">

          <h1>
            Boas Vindas ao
            <span>NumeraMente!</span>
          </h1>

          <h2>
            Aprenda matemática de uma forma
            visual e divertida!
          </h2>

          <p className="descricao-login">
            O NumeraMente ajuda crianças com
            discalculia a praticarem operações
            matemáticas de forma interativa e
            acessível.
          </p>

          <div className="campo-nome">
            <label htmlFor="nome">Qual seu nome?</label>

            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            {/* o nome vai junto na navegação, mas ainda não é salvo no backend */}
            <button type="button" onClick={comecar}>
              Vamos começar
            </button>
          </div>

        </div>

        {/* ilustração composta por imagens */}
        <div className="ilustracoes-login">

          {/* círculo de fundo */}
          <img
            src={Circulo}
            alt=""
            className="circulo-logo"
          />

          {/* estrela superior */}
          <img
            src={Estrela}
            alt=""
            className="estrela-logo-superior"
          />

          {/* estrela pequena à esquerda */}
          <img
            src={Estrela}
            alt=""
            className="estrela-logo-esquerda"
          />

          {/* estrela grande à direita */}
          <img
            src={Estrela}
            alt=""
            className="estrela-logo-direita"
          />

          {/* ilustração do nosso mascote */}
          <img
            src={gatoLivro}
            alt="Mascote do NumeraMente"
            className="gato-logo"
          />

        </div>

      </section>

    </main>
  );
}

export default Login;
