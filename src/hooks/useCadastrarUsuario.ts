import { useMutation, useQueryClient } from "@tanstack/react-query";
import Usuario from "../interfaces/usuario";
import { URL_USUARIOS } from "../util/constants"; 
import useApi from "./useApi";

const useCadastrarUsuario = () => {
  const { cadastrar } = useApi<Usuario>(URL_USUARIOS+"/cadastro"); 
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (usuario: Usuario) => cadastrar(usuario),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usuarios"], 
      });
    },
  });
};

export default useCadastrarUsuario;
