import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Noticia from "../interfaces/noticia";
import { BASE_URL } from "../util/constants";

const useNoticiaPorId = (id: any) => useQuery({
    queryKey: ['noticia', id],
    queryFn: () => axios
      .get<Noticia[]>(`${BASE_URL}/noticias/${id}`)
      .then(res => res.data),
    staleTime: 10_000  
  });
  
  export default useNoticiaPorId;