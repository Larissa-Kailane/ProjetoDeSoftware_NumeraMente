import { useEffect, useState } from "react";

function App() {
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setMensagem(dados.mensagem);
      })
      .catch((erro) => {
        console.error("Erro ao conectar com o backend:", erro);
      });
  }, []);

  return (
    <div>
      <h1>Numeramente</h1>

      <p>{mensagem}</p>
    </div>
  );
}

export default App;