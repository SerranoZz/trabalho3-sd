import { useQuery } from "@tanstack/react-query";
import Noticia from "../interfaces/noticia";
import axios from "axios";
import { BASE_URL } from "../util/constants";

const useNoticias = () => useQuery({
  queryKey: ['noticias'],
  queryFn: () => axios
    .get<Noticia[]>(BASE_URL+"/noticias")
    .then(res => res.data),
  staleTime: 10_000  
});

export default useNoticias;