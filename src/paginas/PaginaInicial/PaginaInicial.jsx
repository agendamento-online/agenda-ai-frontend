import { useEffect, useState } from "react";
import BotaoCustomizado from "../../comum/componentes/BotaoCustomizado/BotaoCustomizado.jsx";
import Principal from "../../comum/componentes/Principal/Principal.jsx";
import "./PaginaInicial.css";
import instanciaApi from "../../comum/servicos/Api.js";


const PaginaInicial = () => {
  const [listaAgendamentos, setListaAgendamentos] = useState([]);

  useEffect(() => {
    const buscarClientes = async () => {
      const response = await instanciaApi.get('/clientes')
      setListaAgendamentos(response.data);
    };
    buscarClientes();

  }, []);

  const excluir = async (idCliente) => {
    if (confirm("Tem certeza?")) {
      const response = await instanciaApi.delete(`/clientes/${idCliente}`);
      setListaAgendamentos(response.data);
    }
  };

  return (
    <Principal titulo="Meus Agendamentos">
      {listaAgendamentos.map((cliente) => {
        return (
          <div key={cliente.id_cliente} className="meus-agendamentos_campo">
            <span>
              <strong>Nome: </strong>
              {cliente.nome}
            </span>
            <span>
              <strong>Veículo: </strong>
              {cliente.veiculo}
            </span>
            <span>
              <strong>Placa: </strong>
              {cliente.placa}
            </span>
            {/* <span>
              <strong>Serviço: </strong>{cliente.servico}
            </span> */}

            <BotaoCustomizado aoClicar={() => excluir(cliente.id_cliente)}>
              Lavação Concluída
            </BotaoCustomizado>
          </div>
        );
      })}
    </Principal>
  );
};

export default PaginaInicial;
