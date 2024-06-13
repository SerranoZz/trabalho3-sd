import { useQuery } from "@tanstack/react-query";
import Produto from "../interfaces/produto";
import axios from "axios";
import { BASE_URL } from "../util/constants";

const useProdutoPorId = (id) => useQuery({
    queryKey: ['produto', id],
    queryFn: () => axios
      .get<Produto[]>(`${BASE_URL}/produtos/${id}`)
      .then(res => res.data),
    staleTime: 10_000  
  });
  
  export default useProdutoPorId;
  