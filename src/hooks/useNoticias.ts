import { useQuery } from "@tanstack/react-query";
import Noticia from "../interfaces/noticia";
import axios from "axios";
import { BASE_URL } from "../util/constants";

const useNoticias = () => {
  return useQuery({
    queryKey: ["noticias"],
    queryFn: async () => {
      const response = await axios.get<{ _embedded: { noticiaList: Noticia[] } }>(
        BASE_URL + "/noticias"
      );
      return response.data._embedded.noticiaList;
    },
    staleTime: 10_000, 
  });
};

export default useNoticias;