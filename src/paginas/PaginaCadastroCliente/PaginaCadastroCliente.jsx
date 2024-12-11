import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../comum/componentes/BotaoCustomizado/BotaoCustomizado.jsx";
import Principal from "../../comum/componentes/Principal/Principal.jsx";
import {
  formatarComMascara,
  MASCARA_CELULAR,
} from "../../comum/utils/mascaras.js";
import "./PaginaCadastroCliente.css";
import instanciaApi from "../../comum/servicos/Api.js";

const PaginaCadastroCliente = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [nome, setNome] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [placa, setPlaca] = useState("");

  useEffect(() => {
    const buscarClientes = async () => {
      if (params.id) {
        const response = await instanciaApi.get("/clientes/" + params.id);

        if (response.data) {
          setNome(response.data.nome);
          setVeiculo(response.data.veiculo);
          setTelefone(response.data.telefone);
          setPlaca(response.data.placa);
        }
      }
    };

    buscarClientes();
  }, [params.id]);

  const salvar = async () => {
    if (!nome || !veiculo) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }
    const cliente = {
      id_cliente: params.id,
      nome,
      veiculo,
      telefone,
      placa,
    };
    if (params.id) {
      await instanciaApi.put("/clientes", cliente);
    } else {
      await instanciaApi.post("/clientes", cliente);
    }
    navigate("/lista-clientes");
  };

  return (
    <Principal
      titulo={params.id ? "Editar Cliente" : "Novo Cliente"}
      voltarPara="/lista-clientes"
    >
      {params.id && (
        <div className="campo">
          <label>Id:</label>
          <input type="text" value={params.id} disabled />
        </div>
      )}

      <div className="campo">
        <label>Nome Completo:</label>
        <input
          type="text"
          placeholder="Digite o nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Veiculo:</label>
        <input
          type="email"
          placeholder="Digite o veículo"
          value={veiculo}
          onChange={(e) => setVeiculo(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Placa:</label>
        <input
          type="text"
          placeholder="Digite a placa do veículo"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Celular:</label>
        <input
          type="tel"
          placeholder="Digite o número do seu Whatsapp"
          value={telefone}
          onChange={(e) =>
            setTelefone(formatarComMascara(e.target.value, MASCARA_CELULAR))
          }
        />
      </div>

      <BotaoCustomizado cor="primaria" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
};

export default PaginaCadastroCliente;
