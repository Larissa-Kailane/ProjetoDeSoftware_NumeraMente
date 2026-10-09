import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Boas Vindas ao NumeraMente!</h1>
      <p>aqui vai vir a tela inicial do numeramente</p>
      {/* Botão de interrogação */}
      <Link to="/duvidas" aria-label="Ir para dúvidas" className="botao-ajuda">
        ir para dúvidas
      </Link>
    </div>
  );
}