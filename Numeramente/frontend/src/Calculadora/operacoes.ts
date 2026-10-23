// aqui fica toda a lógica de cálculo da tela, separada da interface
// para que no futuro possa ser trocada por uma chamada ao backend

export type Operacao = "adicao" | "subtracao" | "multiplicacao" | "divisao";

export type Resultado =
  | { tipo: "ok"; valor: number; resto: number }
  | { tipo: "negativo"; valor: number }
  | { tipo: "divisaoPorZero" };

// limites dos campos, conforme o protótipo ("Insira números de 0 a 10")
export const VALOR_MINIMO = 0;
export const VALOR_MAXIMO = 10;

export function calcular(operacao: Operacao, a: number, b: number): Resultado {
  switch (operacao) {
    case "adicao":
      return { tipo: "ok", valor: a + b, resto: 0 };

    case "subtracao": {
      const valor = a - b;
      // regra RF6 (E02): resultado negativo é tratado à parte
      if (valor < 0) return { tipo: "negativo", valor };
      return { tipo: "ok", valor, resto: 0 };
    }

    case "multiplicacao":
      return { tipo: "ok", valor: a * b, resto: 0 };

    case "divisao":
      // regra RF5 (E01): não é possível dividir por zero
      if (b === 0) return { tipo: "divisaoPorZero" };
      // divisão inteira com resto, para continuar representável em novelos
      return { tipo: "ok", valor: Math.floor(a / b), resto: a % b };
  }
}

// até 20 novelos ficam soltos no cartão; acima disso, em grupos de 20 (5 x 4)
export const NOVELOS_POR_GRUPO = 20;
const NOVELOS_POR_LINHA = 5;

// divide uma quantidade em linhas, imitando o protótipo:
// até 4 novelos -> uma linha; até 10 -> duas linhas (ex: 5 = 3 + 2, 7 = 4 + 3);
// acima disso -> linhas de 5
function dividirEmLinhas(quantidade: number): number[] {
  if (quantidade <= 0) return [];
  if (quantidade <= 4) return [quantidade];
  if (quantidade <= 10) {
    const primeira = Math.ceil(quantidade / 2);
    return [primeira, quantidade - primeira];
  }

  const linhas: number[] = [];
  for (let restante = quantidade; restante > 0; restante -= NOVELOS_POR_LINHA) {
    linhas.push(Math.min(NOVELOS_POR_LINHA, restante));
  }
  return linhas;
}

// retorna os grupos de novelos; cada grupo é uma lista de linhas
// (ex: 7 -> [[4, 3]]; 45 -> [[5,5,5,5], [5,5,5,5], [5]])
export function organizarNovelos(quantidade: number): number[][] {
  if (quantidade <= 0) return [];
  if (quantidade <= NOVELOS_POR_GRUPO) return [dividirEmLinhas(quantidade)];

  const grupos: number[][] = [];
  for (let restante = quantidade; restante > 0; restante -= NOVELOS_POR_GRUPO) {
    const noGrupo = Math.min(NOVELOS_POR_GRUPO, restante);
    const linhas: number[] = [];
    for (let r = noGrupo; r > 0; r -= NOVELOS_POR_LINHA) {
      linhas.push(Math.min(NOVELOS_POR_LINHA, r));
    }
    grupos.push(linhas);
  }
  return grupos;
}
