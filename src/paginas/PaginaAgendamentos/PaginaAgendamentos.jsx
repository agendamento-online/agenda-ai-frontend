import { useEffect, useState } from "react";
import Principal from "../../comum/componentes/Principal/Principal";
import instanciaApi from "../../comum/servicos/Api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../comum/componentes/BotaoCustomizado/BotaoCustomizado";

const PaginaAgendamentos = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [data, setData] = useState("");
  const [tempo, setTempo] = useState("");
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

  const salvar = async () => {
    if (!clienteSelecionado || !data || !tempo || !servico) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    const agendamento = {
      id: params.id,
      clienteSelecionado,
      data,
      tempo,
      servico,
    };

    if(agendamento){
      await instanciaApi.post("/agendamentos", agendamento);
      toast.success("Agendamento salvo com sucesso!");
      navigate("/");
    } else {
      toast.error("Erro ao salvar o agendamento.");
    }
    
  };

  return (
    <Principal titulo={"Novo Agendamento"} voltarPara="/">
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
          value={tempo}
          onChange={(e) => setTempo(e.target.value)}
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
        Cadastrar
      </BotaoCustomizado>
    </Principal>
  );
};

export default PaginaAgendamentos;
