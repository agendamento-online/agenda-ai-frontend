import { useNavigate } from 'react-router-dom';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado.jsx';
import Principal from '../../comum/componentes/Principal/Principal.jsx';
import './PaginaInicial.css';

const PaginaInicial = () => {
  const navigate = useNavigate();

  return (
    <Principal titulo="Página Inicial">

      <BotaoCustomizado cor="primaria" aoClicar={() => navigate('/lista-clientes')}>
        Lista de Clientes
      </BotaoCustomizado>
    </Principal>
  );
};

export default PaginaInicial;
