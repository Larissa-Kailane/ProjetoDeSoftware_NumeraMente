import { useState } from "react";
import type { ChangeEvent, CSSProperties, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Calculadora.css";

import BotaoSoma from "../assets/BotaoSoma.png";
import BotaoSubtracao from "../assets/BotaoSubtracao.png";
import BotaoMultiplicacao from "../assets/BotaoMultiplicacao.png";
import BotaoDivisao from "../assets/BotaoDivisao.png";
import BotaoCalcular from "../assets/BotaoCalcular.png";
import BotaoAjuda from "../assets/BotaoAjuda.png";
import Brilho from "../assets/Brilho de campo selecionado.png";
import SinalSoma from "../assets/sinalSoma.png";
import LaVerde from "../assets/laVerde.png";
import CardChatGato from "../assets/cardChatgato.png";
import Gato from "../assets/gato.png";

import {
  calcular,
  organizarNovelos,
  NOVELOS_POR_GRUPO,
  VALOR_MAXIMO,
  VALOR_MINIMO,
} from "./operacoes";
import type { Operacao, Resultado } from "./operacoes";

// botões do menu lateral, na ordem do protótipo
const OPERACOES: { id: Operacao; nome: string; botao: string }[] = [
  { id: "adicao", nome: "Adição", botao: BotaoSoma },
  { id: "subtracao", nome: "Subtração", botao: BotaoSubtracao },
  { id: "multiplicacao", nome: "Multiplicação", botao: BotaoMultiplicacao },
  { id: "divisao", nome: "Divisão", botao: BotaoDivisao },
];

type Campo = "a" | "b";

type Calculo = {
  operacao: Operacao;
  a: number;
  b: number;
  resultado: Resultado;
  // muda a cada clique em "Calcular", para a animação tocar de novo
  rodada: number;
};

function YarnBall({
  base = "#8a4a45",
  dark = "#4d2a2c",
  light = "#b9736b",
  className,
  idSuffix = "calc",
}: {
  base?: string;
  dark?: string;
  light?: string;
  className?: string;
  idSuffix?: string;
}) {
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

// formas dos sinais em um quadro de 40 x 40
const FORMAS_SINAIS: Record<Operacao | "igual", ReactNode> = {
  adicao: <path d="M16 4h8v12h12v8H24v12h-8V24H4v-8h12z" />,
  subtracao: <rect x="4" y="16" width="32" height="8" rx="1.5" />,
  multiplicacao: (
    <path
      d="M16 4h8v12h12v8H24v12h-8V24H4v-8h12z"
      transform="rotate(45 20 20)"
    />
  ),
  divisao: (
    <>
      <rect x="4" y="16" width="32" height="8" rx="1.5" />
      <circle cx="20" cy="7" r="4.5" />
      <circle cx="20" cy="33" r="4.5" />
    </>
  ),
  igual: (
    <>
      <rect x="4" y="9" width="32" height="8" rx="1.5" />
      <rect x="4" y="23" width="32" height="8" rx="1.5" />
    </>
  ),
};

// sinais com o mesmo efeito 3D do sinalSoma.png, na cor da operação
function Sinal({ tipo }: { tipo: Operacao | "igual" }) {
  // o sinal de soma já existe nos assets
  if (tipo === "adicao") {
    return <img src={SinalSoma} alt="mais" className="calc-sinal" />;
  }

  const nomes = {
    subtracao: "menos",
    multiplicacao: "vezes",
    divisao: "dividido por",
    igual: "igual a",
  };

  return (
    <svg viewBox="0 0 42 42" className="calc-sinal" role="img" aria-label={nomes[tipo]}>
      <g className="calc-sinal-sombra" transform="translate(2 2)">
        {FORMAS_SINAIS[tipo]}
      </g>
      <g className="calc-sinal-face">{FORMAS_SINAIS[tipo]}</g>
    </svg>
  );
}

// desenha a quantidade de novelos; os "cinzas" são os últimos da lista
// (usado na subtração para mostrar os novelos retirados).
// com "animar", os novelos aparecem um após o outro
function Novelos({
  quantidade,
  cinzas = 0,
  animar = false,
}: {
  quantidade: number;
  cinzas?: number;
  animar?: boolean;
}) {
  const grupos = organizarNovelos(quantidade);
  if (grupos.length === 0) return null;

  let tamanho = "grande";
  if (quantidade > NOVELOS_POR_GRUPO) tamanho = "pequeno";
  else if (quantidade > 10) tamanho = "medio";

  const descricao =
    cinzas > 0
      ? `${quantidade - cinzas} novelos, e ${cinzas} retirados`
      : `${quantidade} ${quantidade === 1 ? "novelo" : "novelos"}`;

  // maior linha, usada no CSS para os novelos caberem no cartão
  const porLinha = Math.max(...grupos[0]);

  // intervalo entre um novelo e outro, para a animação toda durar no máximo ~0,7s
  const intervalo = Math.min(80, 700 / quantidade);

  let indice = 0;

  return (
    <div
      className={`calc-novelos ${tamanho}`}
      style={{ "--por-linha": porLinha } as CSSProperties}
      role="img"
      aria-label={descricao}
    >
      {grupos.map((linhas, g) => (
        <div className="calc-grupo" key={g}>
          {linhas.map((qtdNaLinha, l) => (
            <div className="calc-linha-novelos" key={l}>
              {Array.from({ length: qtdNaLinha }, () => {
                const atual = indice++;
                const retirado = atual >= quantidade - cinzas;
                let classe = retirado ? "calc-novelo retirado" : "calc-novelo";
                if (animar) classe += " surgindo";
                return (
                  <img
                    key={atual}
                    src={LaVerde}
                    alt=""
                    className={classe}
                    style={
                      animar
                        ? ({ "--atraso": `${Math.round(atual * intervalo)}ms` } as CSSProperties)
                        : undefined
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// texto de apoio abaixo da área dos novelos
function mensagemDoCalculo(calculo: Calculo): string | null {
  const { operacao, a, b, resultado } = calculo;

  if (resultado.tipo === "divisaoPorZero") {
    return "Não é possível dividir por zero! Não conseguimos dividir por nada. Troque o segundo número.";
  }

  if (resultado.tipo === "negativo") {
    const faltam = b - a;
    return `Não dá para tirar ${b} novelos de ${a}. Faltam ${faltam} ${
      faltam === 1 ? "novelo" : "novelos"
    } para completar a conta!`;
  }

  if (resultado.valor === 0) {
    return "O resultado é zero: não sobrou nenhum novelo!";
  }

  if (resultado.resto > 0) {
    return `A divisão não foi exata: sobrou ${resultado.resto} ${
      resultado.resto === 1 ? "novelo" : "novelos"
    }.`;
  }

  if (resultado.valor > NOVELOS_POR_GRUPO) {
    return `São muitos novelos! Por isso eles aparecem em grupos de ${NOVELOS_POR_GRUPO}.`;
  }

  if (operacao === "subtracao" && b > 0) {
    return "Os novelos cinzas são os que foram retirados.";
  }

  return null;
}

export default function Calculadora() {
  const location = useLocation();
  // nome digitado na tela de login (enviado pela navegação)
  const nome = (location.state as { nome?: string } | null)?.nome?.trim();

  const [operacao, setOperacao] = useState<Operacao>("adicao");
  const [valores, setValores] = useState<Record<Campo, string>>({ a: "", b: "" });
  const [calculo, setCalculo] = useState<Calculo | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [camposComErro, setCamposComErro] = useState<Campo[]>([]);

  const operacaoAtual = OPERACOES.find((op) => op.id === operacao)!;

  function escolherOperacao(nova: Operacao) {
    setOperacao(nova);
    // trocar de operação limpa o resultado anterior (RF6)
    setCalculo(null);
    setAviso(null);
    setCamposComErro([]);
  }

  function aoDigitar(campo: Campo, evento: ChangeEvent<HTMLInputElement>) {
    const texto = evento.target.value;

    // regra RF4 (E01): só aceita números
    if (texto !== "" && !/^\d+$/.test(texto)) {
      setAviso("Apenas números são permitidos.");
      return;
    }

    const numero = Number(texto);
    if (texto !== "" && (numero < VALOR_MINIMO || numero > VALOR_MAXIMO)) {
      setAviso(`Insira números de ${VALOR_MINIMO} a ${VALOR_MAXIMO}.`);
      return;
    }

    setValores((atuais) => ({ ...atuais, [campo]: texto === "" ? "" : String(numero) }));
    // mudar um valor apaga o resultado antigo, para não mostrar uma conta errada
    setCalculo(null);
    setAviso(null);
    setCamposComErro((atuais) => atuais.filter((c) => c !== campo));
  }

  function aoCalcular() {
    // regra RF4 (E02): os dois campos precisam estar preenchidos
    const vazios = (["a", "b"] as Campo[]).filter((c) => valores[c] === "");
    if (vazios.length > 0) {
      setCamposComErro(vazios);
      setAviso("Por favor, preencha todos os valores.");
      setCalculo(null);
      return;
    }

    const a = Number(valores.a);
    const b = Number(valores.b);
    const resultado = calcular(operacao, a, b);

    setAviso(null);
    // regra RF6 (E01): na divisão por zero, o divisor fica destacado em vermelho
    setCamposComErro(resultado.tipo === "divisaoPorZero" ? ["b"] : []);
    setCalculo((anterior) => ({
      operacao,
      a,
      b,
      resultado,
      rodada: (anterior?.rodada ?? 0) + 1,
    }));
  }

  const resultado = calculo?.resultado;
  const mensagem = aviso ?? (calculo ? mensagemDoCalculo(calculo) : null);

  // na subtração o cartão de resultado mostra o primeiro número,
  // com os novelos retirados em cinza.
  // resultado zero não mostra nenhum novelo (regra RF6 - A02)
  let novelosResultado = 0;
  let novelosCinzas = 0;
  if (calculo && resultado?.tipo === "ok" && resultado.valor > 0) {
    if (calculo.operacao === "subtracao") {
      novelosResultado = calculo.a;
      novelosCinzas = calculo.b;
    } else {
      novelosResultado = resultado.valor;
    }
  }

  return (
    <main className="calc-page" data-operacao={operacao}>
      <header className="calc-header">
        {/* logo: volta para a tela de boas-vindas (login) */}
        <Link to="/" className="calc-marca" aria-label="Voltar para a tela de boas-vindas">
          <YarnBall className="calc-logo" idSuffix="calc-logo" />
          <p className="calc-brand">NUMERAMENTE</p>
        </Link>

        {/* botão de interrogação: leva para a tela de dúvidas */}
        <Link to="/duvidas" aria-label="Ir para dúvidas" className="calc-ajuda">
          <img src={BotaoAjuda} alt="" />
        </Link>
      </header>

      <div className="calc-conteudo">
        {/* menu lateral com as operações e o botão calcular */}
        <aside className="calc-menu" aria-label="Operações">
          <div className="calc-operacoes">
            {OPERACOES.map((op) => {
              const selecionada = op.id === operacao;
              return (
                <button
                  key={op.id}
                  type="button"
                  className={selecionada ? "calc-op selecionada" : "calc-op"}
                  aria-pressed={selecionada}
                  onClick={() => escolherOperacao(op.id)}
                >
                  {/* brilho atrás do botão selecionado */}
                  {selecionada && <img src={Brilho} alt="" className="calc-brilho" />}
                  <img src={op.botao} alt={op.nome} className="calc-op-imagem" />
                </button>
              );
            })}
          </div>

          <button type="button" className="calc-calcular" onClick={aoCalcular}>
            <img src={BotaoCalcular} alt="Calcular" />
          </button>
        </aside>

        <section className="calc-principal">
          <h1 className="calc-titulo">
            {nome ? `Vamos começar, ${nome}!` : "Vamos começar!"}
          </h1>

          <div className="calc-painel">
            <div className="calc-painel-interno">
              <p className="calc-praticando">
                Você está praticando a{" "}
                <span className="calc-destaque">{operacaoAtual.nome.toUpperCase()}</span>
              </p>

              <p className="calc-instrucao" id="calc-instrucao">
                Insira números de {VALOR_MINIMO} a {VALOR_MAXIMO}:
              </p>

              {/* linha dos campos: número, sinal, número, igual e resultado */}
              <div className="calc-linha calc-linha-campos">
                <input
                  className={camposComErro.includes("a") ? "calc-campo erro" : "calc-campo"}
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  autoComplete="off"
                  aria-label="Primeiro número"
                  aria-describedby="calc-instrucao"
                  aria-invalid={camposComErro.includes("a")}
                  value={valores.a}
                  onChange={(e) => aoDigitar("a", e)}
                />

                <Sinal tipo={operacao} />

                <input
                  className={camposComErro.includes("b") ? "calc-campo erro" : "calc-campo"}
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  autoComplete="off"
                  aria-label="Segundo número"
                  aria-describedby="calc-instrucao"
                  aria-invalid={camposComErro.includes("b")}
                  value={valores.b}
                  onChange={(e) => aoDigitar("b", e)}
                />

                <Sinal tipo="igual" />

                {/* a key faz o número animar de novo a cada cálculo */}
                <div className="calc-resultado" aria-live="polite" key={calculo?.rodada}>
                  {resultado?.tipo === "ok" && (
                    <>
                      <span className="calc-resultado-numero">{resultado.valor}</span>
                      {resultado.resto > 0 && (
                        <span className="calc-resto">resto {resultado.resto}</span>
                      )}
                    </>
                  )}
                  {resultado?.tipo === "negativo" && (
                    <span className="calc-resultado-numero negativo">
                      −{Math.abs(resultado.valor)}
                    </span>
                  )}
                </div>
              </div>

              {/* área visual com os novelos */}
              <div className="calc-area-novelos">
                <div className="calc-linha">
                  <div className="calc-cartao">
                    {valores.a !== "" && <Novelos quantidade={Number(valores.a)} />}
                  </div>

                  <Sinal tipo={operacao} />

                  <div className="calc-cartao">
                    {valores.b !== "" && <Novelos quantidade={Number(valores.b)} />}
                  </div>

                  <Sinal tipo="igual" />

                  {/* cartão do resultado brilha uma vez após o cálculo */}
                  <div
                    className={calculo ? "calc-cartao destaque" : "calc-cartao"}
                    key={calculo?.rodada}
                  >
                    <Novelos quantidade={novelosResultado} cinzas={novelosCinzas} animar />
                  </div>
                </div>
              </div>

              <p
                className={aviso ? "calc-mensagem erro" : "calc-mensagem"}
                role="status"
              >
                {mensagem}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* mascote estático com o balão de conversa */}
      <img
        src={CardChatGato}
        alt="Estou aqui se precisar de ajuda!"
        className="calc-balao"
      />
      <div className="calc-gato" aria-hidden="true">
        <img src={Gato} alt="" />
      </div>
    </main>
  );
}
