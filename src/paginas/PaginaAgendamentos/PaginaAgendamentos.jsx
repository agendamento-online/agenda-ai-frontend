import { useEffect, useState } from "react";
import Principal from "../../comum/componentes/Principal/Principal.jsx";
import instanciaApi from "../../comum/servicos/Api.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../comum/componentes/BotaoCustomizado/BotaoCustomizado.jsx";

const PaginaAgendamentos = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [servico, setServico] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const response = await instanciaApi.get("/clientes");
        setListaClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        toast.error("Erro ao carregar a lista de clientes!");
      }
    };
    buscarClientes();
  }, []);

  useEffect(() => {
    const buscarAgendamento = async () => {
      if (params.id) {
        const response = await instanciaApi.get("/agendamentos/" + params.id);

        if (response.data) {
          setClienteSelecionado(response.data.cliente_id);
          setData(response.data.data_servico);
          setHorario(response.data.horario);
          setServico(response.data.servico);
        }
      }
    };

    buscarAgendamento();
  }, [params.id]);

  const salvar = async () => {
    if (!clienteSelecionado || !data || !horario || !servico) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    const agendamento = {
      id_agendamento: params.id,
      clienteSelecionado,
      data,
      horario,
      servico,
    };

    if (!params.id) {
      await instanciaApi.post("/agendamentos", agendamento);
      toast.success("Agendamento salvo com sucesso!");
      navigate("/")
    } else {
      await instanciaApi.put("/agendamentos", agendamento);
      toast.success("Agendamento atualizado.");
      navigate("/");
    }
  };

  return (
    <Principal
      titulo={params.id ? "Editar Agendamento" : "Novo Agendamento"}
      voltarPara="/"
    >
      {params.id && (
        <div className="campo">
          <label>Id:</label>
          <input type="text" value={params.id} disabled />
        </div>
      )}

      <div className="campo">
        <label>Escolha o cliente: </label>
        <select
          className="campo_cliente"
          value={clienteSelecionado}
          onChange={(e) => setClienteSelecionado(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        >
          <option value="">Selecione...</option>
          {listaClientes.map((cliente) => (
            <option key={cliente.id_cliente} value={cliente.id_cliente}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Horário:</label>
        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Serviço:</label>
        <input
          type="text"
          placeholder="Qual o tipo de serviço?"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
        />
      </div>

      <BotaoCustomizado cor="primaria" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
};

export default PaginaAgendamentos;
