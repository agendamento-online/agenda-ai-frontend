import { Link } from "react-router-dom";
import "./Rodape.css";

function Rodape() {
  return (
    <footer className="rodape_root">
      <Link className="link_campo" to={"/cadastro-cliente"}>
        <h3>
        Novo Cliente
        </h3>
      </Link>
      <Link className="link_campo" to={"/novo-agendamento"}>
        <h3>Agendar</h3>
      </Link>
      <Link className="link_campo" to={"/lista-clientes"}>
        <h3>Meu Clientes</h3>
      </Link>
    </footer>
  );
}

export default Rodape;
