import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar.jsx";
import "./Cabecalho.css";
import ServicoAutenticacao from "../../servicos/ServicoAutenticacao.js";

const instanciaServicoAutenticacao = new ServicoAutenticacao();

function Cabecalho() {
  const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

  return (
    <header className="cabecalho_root">
      <Link to="/">
        <img src="/agenda-ai-icon.png" height={60} />
      </Link>

      <h2 className="titulo">Agenda Aí!</h2>

      {usuarioLogado && (
        <Link to="/meu-perfil">
          <Avatar nome={usuarioLogado.nome} />
        </Link>
      )}
    </header>
  );
}

export default Cabecalho;
