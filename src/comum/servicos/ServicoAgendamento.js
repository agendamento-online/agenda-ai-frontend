import instanciaApi from "./Api.js";

class ServicoAgendamento {
  listar() {
    return instanciaApi.get("/agendamentos");
  }

  cadastrarAgendamento(agendamento) {
    return instanciaApi.post("/agendamentos", agendamento);
  }

  editarAgendamento(idAgendamento, agendamento) {
    return instanciaApi.put(`/agendamentos/${idAgendamento}`, agendamento);
  }

  buscarPorId(idAgendamento) {
    return instanciaApi.get(`/agendamentos/${idAgendamento}`);
  }

  excluirAgendamento(idAgendamento){
    return instanciaApi.delete(`/agendamentos/${idAgendamento}`)
  }
}

export default ServicoAgendamento;
