import { FaChevronLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Cabecalho from '../Cabecalho/Cabecalho.jsx';
import './Principal.css';
import Rodape from '../Rodape/Rodape.jsx';

function Principal({ voltarPara, titulo, children }) {
  return (
    <>
      <Cabecalho />
      <main className="principal_root">
        <div className="principal_titulo">
          {voltarPara && (
            <Link to={voltarPara}>
              <FaChevronLeft size={20} color="#3f50b5" />
            </Link>
          )}

          <h1>{titulo}</h1>
        </div>

        {children}
      </main>

      <Rodape />
    </>
  );
}

export default Principal;
