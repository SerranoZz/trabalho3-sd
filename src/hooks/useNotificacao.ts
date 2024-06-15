import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../util/constants";
import Notificacao from "../interfaces/notificacao";

const useNotificacao = (ultimoIdVisualizado: string) => {
  return useQuery(['ultimasNotificacoes', ultimoIdVisualizado], async () => {
    const url = `${BASE_URL}/notificacoes/ultimas?ultimoIdVisualizado=${ultimoIdVisualizado}`;
    const response = await axios.get<Notificacao[]>(url);
    return response.data;
  }, {
    staleTime: 10000 
  });
};

export default useNotificacao;
