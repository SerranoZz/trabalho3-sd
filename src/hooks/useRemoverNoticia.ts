import { useMutation, useQueryClient } from "@tanstack/react-query";
import Noticia from "../interfaces/noticia";
import { URL_NOTICIAS } from "../util/constants";
import useApi from "./useApi";

const useRemoverNoticia = () => {
  const { removerPorId } = useApi<Noticia>(URL_NOTICIAS);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => removerPorId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["noticias"],
      });
    },
  });
};

export default useRemoverNoticia;