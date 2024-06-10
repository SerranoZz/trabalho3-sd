import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Noticia from "../interfaces/noticia";

const useNoticiaPorId = (id) => useQuery({
    queryKey: ['noticia', id],
    queryFn: () => axios
      .get<Noticia[]>(`http://localhost:8080/noticias/${id}`)
      .then(res => res.data),
    staleTime: 10_000  
  });
  
  export default useNoticiaPorId;