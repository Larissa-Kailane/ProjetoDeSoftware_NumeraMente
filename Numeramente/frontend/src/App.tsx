import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Duvidas from "./Duvidas/Duvidas";
import Home from "./Home/Home";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/duvidas" element={<Duvidas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;