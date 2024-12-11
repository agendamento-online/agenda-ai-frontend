import { useEffect, useState } from "react";
import BotaoCustomizado from "../../comum/componentes/BotaoCustomizado/BotaoCustomizado.jsx";
import Principal from "../../comum/componentes/Principal/Principal.jsx";
import "./PaginaInicial.css";
import instanciaApi from "../../comum/servicos/Api.js";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const PaginaInicial = () => {
  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarClientes = async () => {
      const response = await instanciaApi.get('/agendamentos')
      setListaAgendamentos(response.data);
    };
    buscarClientes();
  }, []);

  const excluir = async (idAgendamento) => {
    if (confirm("Tem certeza?")) {
      const response = await instanciaApi.delete(`/agendamentos/${idAgendamento}`);
      setListaAgendamentos(response.data);
    }
  };

  const navegarParaEdicao = (idAgendamento) => {
    navigate(`/novo-agendamento/${idAgendamento}`);
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
              <strong>Data: </strong>
              {cliente.data_servico}
            </span>
            <span>
              <strong>Horário: </strong>
              {cliente.horario}
            </span>
            <span>
              <strong>Serviço: </strong>{cliente.servico}
            </span>

            <BotaoCustomizado aoClicar={() => excluir(cliente.id_agendamento)}>
              Lavação Concluída
            </BotaoCustomizado>
            <FaEdit size={24} onClick={() => navegarParaEdicao(cliente.id_agendamento)} />
          </div>
        );
      })}
    </Principal>
  );
};

export default PaginaInicial;
