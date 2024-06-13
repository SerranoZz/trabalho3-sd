import { useQuery } from "@tanstack/react-query";
import Produto from "../interfaces/produto";
import axios from "axios";
import { BASE_URL } from "../util/constants";

const useProdutosEmItensCarrinho = () => useQuery({
  queryKey: ['produtos'],
  queryFn: () => axios
    .get<Produto[]>(BASE_URL+"/produtos/em-itens-carrinho")
    .then(res => res.data),
  staleTime: 10_000  
});

export default useProdutosEmItensCarrinho;