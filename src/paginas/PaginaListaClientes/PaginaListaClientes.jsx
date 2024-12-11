import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Principal from "../../comum/componentes/Principal/Principal.jsx";
import "./PaginaListaClientes.css";
import instanciaApi from "../../comum/servicos/Api.js";


const PaginaListaClientes = () => {
  const navigate = useNavigate();
  const [listaClientes, setListaClientes] = useState([]);

  useEffect(() => {
    const buscarClientes = async () => {
      const response = await instanciaApi.get('/clientes');
      setListaClientes(response.data);
    }
    buscarClientes();
  }, []);


  const navegarParaEdicao = (idCliente) => {
    navigate(`/cadastro-cliente/${idCliente}`);
  };


    const excluirCliente = async (idCliente) => {
      if (confirm("Tem certeza?")) {
        const response = await instanciaApi.delete(`/clientes/${idCliente}`);
        setListaClientes(response.data);
      }
    };

  return (
    <Principal titulo="Meus Clientes" voltarPara="/">
      {listaClientes.map((cliente) => {
        return (
          <div key={cliente.id_cliente} className="pagina-lista-clientes__item-cliente">
            <span>
            <strong>Cliente: </strong>{cliente.nome}
            </span>
            <span>
              <strong>Veículo: </strong>{cliente.veiculo}
            </span>

            <div className="pagina-lista-clientes__item-cliente-acoes">
              <FaEdit size={24} onClick={() => navegarParaEdicao(cliente.id_cliente)} />

              <FaTrash
                size={24}
                color="red"
                onClick={() => excluirCliente(cliente.id_cliente)}
              />
            </div>
          </div>
        );
      })}
    </Principal>
  );
};

export default PaginaListaClientes;
