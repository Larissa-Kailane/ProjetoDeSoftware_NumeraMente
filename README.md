<div align="center">

<img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge" alt="Status: Em desenvolvimento"/>
<img src="https://img.shields.io/badge/versão-0.1-blue?style=for-the-badge" alt="Versão 0.1"/>
<img src="https://img.shields.io/badge/licença-MIT-green?style=for-the-badge" alt="Licença MIT"/>

# 🧠 NumeraMente

**Plataforma web educacional de matemática para crianças com discalculia.**

*Aprender com números pode ser visual, intuitivo e acessível.*

[Sobre](#-sobre-o-projeto) · [Funcionalidades](#-funcionalidades) · [Tecnologias](#-tecnologias) · [Como-executar](#-como-executar-o-projeto) · [Requisitos](#-requisitos-do-sistema)

</div>

---

## 📖 Sobre o Projeto

O **NumeraMente** é uma aplicação web educacional voltada ao ensino de operações matemáticas básicas para crianças entre 6 e 12 anos, com atenção especial a estudantes que apresentam **discalculia** — um transtorno neurobiológico que dificulta a compreensão, o processamento e a manipulação de números.

A plataforma utiliza **representações visuais interativas** (blocos, bolinhas e animações) para substituir a abstração numérica por experiências concretas, reduzindo a sobrecarga cognitiva e promovendo o desenvolvimento gradual do **senso numérico**.

> ⚠️ **Aviso importante:** O NumeraMente é uma ferramenta complementar ao ensino formal. Ele não substitui o acompanhamento pedagógico de professores, pais ou profissionais especializados.

### 🎯 Quem se beneficia?

| Perfil | Como utiliza |
|---|---|
| 👧 **Crianças (6–12 anos)** | Usuário direto da plataforma |
| 👨‍👩‍👧 **Pais e responsáveis** | Acompanham e apoiam o aprendizado |
| 👩‍🏫 **Professores e educadores** | Utilizam como recurso pedagógico complementar |

---

## ✨ Funcionalidades

- **🔐 Autenticação de usuários** — nome do usuário para entrada no sistema
- **🏠 Dashboard de boas-vindas** — tutorial inicial que orienta a criança e o responsável
- **🎛️ Menu iconográfico de operações** — seleção visual e colorida de adição, subtração, multiplicação e divisão
- **🧮 Calculadora visual interativa** — inserção de valores e execução das operações
- **👀 Passo a passo visual** — decomposição dos cálculos com blocos e bolinhas para associar números a quantidades
- **🎨 Interface inclusiva** — tipografia de alta legibilidade, alto contraste e linguagem acessível para crianças

---

## 🚀 Tecnologias

| Camada | Tecnologia |
|---|---|
| **Frontend** | React + TypeScript + Vite |
| **Backend** | Python + FastAPI |
| **Servidor Backend** | Uvicorn |
| **Comunicação** | API REST / HTTP + JSON |
| **Banco de dados** | SQLite *(previsto)* |
| **Design** | Figma |
| **Hospedagem (prevista)** | Render ou similar |

---

## 📁 Estrutura do Projeto

O projeto é dividido em duas aplicações principais: **frontend** e **backend**.

```text
Numeramente/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── venv/
│
├── .gitignore
├── AGENTS.md
└── LICENSE
```

### 🌐 Frontend

O frontend é responsável pela interface visual da aplicação e pela interação com o usuário.

Tecnologias utilizadas:

- React
- TypeScript
- Vite

### 🐍 Backend

O backend é responsável pela API e pelas regras de negócio da aplicação.

Tecnologias utilizadas:

- Python
- FastAPI
- Uvicorn

> ⚠️ A pasta `venv/` é o ambiente virtual local do Python e não deve ser enviada para o GitHub. Ela está configurada no `.gitignore`.

---

## 🔄 Comunicação entre Frontend e Backend

O frontend e o backend funcionam como aplicações separadas e se comunicam através de requisições HTTP.

Durante o desenvolvimento:

| Aplicação | Endereço |
|---|---|
| 🌐 Frontend | `http://localhost:5173` |
| 🐍 Backend | `http://127.0.0.1:8000` |

---

# 💻 Como Executar o Projeto

## 📋 Pré-requisitos

Antes de iniciar o projeto, é necessário ter instalado:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- [VS Code](https://code.visualstudio.com/) *(recomendado)*

---

## 1. Clonar o Repositório

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd Numeramente
```

---

# 🌐 Configuração do Frontend

## 2. Entrar na pasta do Frontend

```bash
cd frontend
```

## 3. Instalar as dependências

```bash
npm install
```

## 4. Executar o Frontend

```bash
npm run dev
```

O Vite exibirá um endereço semelhante a:

```text
http://localhost:5173/
```

Abra esse endereço no navegador.

> ⚠️ Mantenha esse terminal aberto enquanto estiver utilizando o frontend.

---

# 🐍 Configuração do Backend

## 5. Abrir um segundo terminal

Abra um novo terminal no VS Code para executar o backend.

Volte para a pasta principal do projeto:

```bash
cd ..
```

Entre na pasta do backend:

```bash
cd backend
```

## 6. Criar o ambiente virtual

No Windows:

```bash
py -m venv venv
```

## 7. Ativar o ambiente virtual

No Windows:

```bash
venv\Scripts\activate
```

Quando o ambiente estiver ativo, o terminal deverá apresentar:

```text
(venv)
```

no início da linha.

## 8. Instalar as dependências do Python

```bash
pip install -r requirements.txt
```

## 9. Executar o Backend

```bash
uvicorn main:app --reload
```

O backend estará disponível em:

```text
http://127.0.0.1:8000
```

> ⚠️ Mantenha esse segundo terminal aberto enquanto estiver utilizando o backend.

---

## ▶️ Executando Frontend e Backend

Para o sistema funcionar corretamente durante o desenvolvimento, os dois servidores devem estar rodando simultaneamente.

### Terminal 1 — Frontend

```bash
cd frontend
npm run dev
```

Acesso:

```text
http://localhost:5173
```

### Terminal 2 — Backend

```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload
```

Acesso:

```text
http://127.0.0.1:8000
```

---

# 📋 Requisitos do Sistema

## Funcionais

| # | Descrição | Requisito |
|---|---|---|
| RF01 | O sistema deve permitir que o usuário insira seu nome ao acessar o site NumeraMente. | Inserção de nome na entrada do sistema |
| RF02 | O sistema deve exibir, na página principal, um menu com as opções de operações matemáticas disponíveis. | Exibição das funcionalidades matemáticas disponíveis |
| RF03 | O usuário deve ser capaz de selecionar a operação matemática desejada. | Seleção de operação matemática |
| RF04 | O sistema deve permitir que o usuário insira os valores necessários para o cálculo. | Inserção de valores numéricos |
| RF05 | O sistema deve disponibilizar um botão para executar o cálculo com base na operação selecionada e nos valores informados. | Execução do cálculo |
| RF06 | O sistema deve apresentar ao usuário o resultado do cálculo realizado. | Exibição do resultado |
| RF07 | O sistema deve apresentar a decomposição do cálculo realizado, detalhando o passo a passo da operação. | Exibição do passo a passo do cálculo |

---

## Não Funcionais

| # | Requisito |
|---|---|
| RNF01 | Usabilidade |
| RNF02 | Desempenho |
| RNF03 | Confiabilidade |
| RNF04 | Disponibilidade |
| RNF05 | Segurança |
| RNF06 | Portabilidade |
| RNF07 | Manutenibilidade |
| RNF08 | Escalabilidade |
| RNF09 | Acessibilidade |

---

# 📚 Referências

- [Discalculia: o que é? — UniDomBosco](https://unidombosco.edu.br/blog/discalculia-o-que-e/)
- [Discalculia — CUF Saúde](https://www.cuf.pt/saude-a-z/discalculia)
- [Como trabalhar o aluno com discalculia — Instituto Neurosaber](https://institutoneurosaber.com.br/artigos/como-trabalhar-o-aluno-com-discalculia/)
- [Dyscalculia strategies — Magrid Education](https://magrid.education/pt/dyscalculia-strategies/)
- [Discalculia — GREPEL/USP](https://sites.usp.br/grepel/discalculia/)

---

<div align="center">

Desenvolvido com 💜 para tornar a matemática mais acessível.

**NumeraMente** · versão 0.1 · 2026

</div>
