import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BotaoCustomizado from "../../comum/componentes/BotaoCustomizado/BotaoCustomizado.jsx";
import Principal from "../../comum/componentes/Principal/Principal.jsx";
import ServicoCliente from "../../comum/servicos/ServicoCliente.js";
import {
  formatarComMascara,
  MASCARA_CELULAR,
} from "../../comum/utils/mascaras.js";
import "./PaginaCadastroCliente.css";

const instanciaServicoCliente = new ServicoCliente();

const PaginaCadastroCliente = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [nome, setNome] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [celular, setCelular] = useState("");
  const [placa, setPlaca] = useState("");

  useEffect(() => {
    if (params.id) {
      const clienteEncontrado = instanciaServicoCliente.buscarPorId(params.id);
      if (clienteEncontrado) {
        setNome(clienteEncontrado.nome);
        setVeiculo(clienteEncontrado.veiculo);
        setCelular(clienteEncontrado.celular);
        setPlaca(clienteEncontrado.placa);
      }
    }
  }, [params.id]);

  const salvar = () => {
    if (!nome || !veiculo) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }
    const cliente = {
      id: params.id ? +params.id : Date.now(),
      nome,
      veiculo,
      celular,
      placa,
    };
    if (params.id) {
      instanciaServicoCliente.editarCliente(cliente);
    } else {
      instanciaServicoCliente.cadastrarCliente(cliente);
    }
    navigate("/");
  };

  return (
    <Principal
      titulo={params.id ? "Editar Cliente" : "Novo Cliente"}
      voltarPara="/lista-clientes"
    >
      {params.id && (
        <div className="campo">
          <label>Id</label>
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
        <label>Plca:</label>
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
          value={celular}
          onChange={(e) =>
            setCelular(formatarComMascara(e.target.value, MASCARA_CELULAR))
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
