import { useMutation, useQueryClient } from "@tanstack/react-query";
import Noticia from "../interfaces/noticia";
import { URL_NOTICIAS } from "../util/constants";
import useApi from "./useApi";


const useAlterarNoticia = () => {
  const { alterar } = useApi<Noticia>(URL_NOTICIAS);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (noticia: Noticia) => alterar(noticia),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["noticias"],
      });
    },
  });
};

export default useAlterarNoticia;
