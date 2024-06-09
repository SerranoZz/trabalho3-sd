import { useQuery } from "@tanstack/react-query";
import Noticia from "../interfaces/noticia";
import axios from "axios";

const useNoticias = () => useQuery({
  queryKey: ['noticias'],
  queryFn: () => axios
    .get<Noticia[]>("http://localhost:8080/noticias")
    .then(res => res.data),
  staleTime: 10_000  
});

export default useNoticias;