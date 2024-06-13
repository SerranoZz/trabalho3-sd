import { useQuery } from "@tanstack/react-query";
import ItemCarrinho from "../interfaces/itemcarrinho";
import axios from "axios";
import { BASE_URL } from "../util/constants";

const useItemCarrinho = () => useQuery({
  queryKey: ['itens'],
  queryFn: () => axios
    .get<ItemCarrinho[]>(BASE_URL+"/itens")
    .then(res => res.data),
  staleTime: 10_000  
});

export default useItemCarrinho;