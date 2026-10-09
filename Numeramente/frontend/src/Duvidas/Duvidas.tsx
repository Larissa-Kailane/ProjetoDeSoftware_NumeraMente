import { Link } from "react-router-dom";
import './Duvidas.css'

export default function Duvidas() {
  return (
    <div>
      <h1>Como funciona?</h1>
      <p>aqui vai vir a tela de duvidas do numeramente :D.</p>

      <Link to="/">← Voltar</Link>
    </div>
  );
}