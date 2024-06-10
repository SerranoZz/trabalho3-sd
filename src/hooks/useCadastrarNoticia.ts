import { useMutation, useQueryClient } from "@tanstack/react-query";
import Noticia from "../interfaces/noticia";
import { URL_NOTICIAS } from "../util/constants";
import useApi from "./useApi";

const useCadastrarNoticia = () => {
  const { cadastrar } = useApi<Noticia>(URL_NOTICIAS);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (noticia: Noticia) => cadastrar(noticia),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["noticias"],
      });
    },
  });
};

export default useCadastrarNoticia;
