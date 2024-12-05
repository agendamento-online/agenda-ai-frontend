import { Link } from 'react-router-dom';
import './Rodape.css';

function Rodape() {

  return (
    <footer className="rodape_root">
      <Link to={"/cadastro-cliente"}>Novo Cliente</Link>
      <Link to={"/lista-tarefas"}>Lista de Tarefas</Link>
      <Link to={"/lista-clientes"}>Meu Clientes</Link>
    </footer>
  );
}

export default Rodape;
