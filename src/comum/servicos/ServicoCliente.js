import instanciaApi from "./Api.js";

class ServicoCliente {
  listar() {
    return instanciaApi.get("/clientes");
  }

  cadastrarCliente() {
    return instanciaApi.post('/clientes');
  }

  editarCliente(cliente) {
    const clientesDoLocalStorage = this.listar();
    const indexCliente = clientesDoLocalStorage.findIndex(
      (c) => c.id === +cliente.id
    );
    clientesDoLocalStorage[indexCliente] = cliente;
    localStorage.setItem(
      "lista-clientes",
      JSON.stringify(clientesDoLocalStorage)
    );
  }

  buscarPorId(idCliente) {
    const clientesDoLocalStorage = this.listar();
    return clientesDoLocalStorage.find((c) => c.id === +idCliente);
  }

  excluirCliente(idCliente) {
    const clientesDoLocalStorage = this.listar();

    const listaAtualizada = clientesDoLocalStorage.filter((c) => {
      return c.id !== idCliente;
    });

    localStorage.setItem("lista-clientes", JSON.stringify(listaAtualizada));
    return listaAtualizada;
  }
}

export default ServicoCliente;
