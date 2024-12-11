import instanciaApi from "./Api.js";

class ServicoCliente {
  listar() {
    return instanciaApi.get("/clientes");
  }

  cadastrarCliente(novoCliente) {
    return instanciaApi.post('/clientes', novoCliente);
  }

  editarCliente( cliente) {
    return instanciaApi.put('/clientes', cliente)
  }

  buscarPorId(idCliente) {
    return instanciaApi.get(`/clientes/${idCliente}`)
  }

  excluirCliente(idCliente) {
    return instanciaApi.delete(`/clientes/${idCliente}`)
  }
}

export default ServicoCliente;
