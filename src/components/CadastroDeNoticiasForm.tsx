import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dataValida from "../util/dataValida";
import { useEffect } from "react";
import dayjs from "dayjs";
import { DevTool } from "@hookform/devtools";
import useNoticiaStore from "../store/noticiaStore";
import Noticia from "../interfaces/noticia";
import useCadastrarNoticia from "../hooks/useCadastrarNoticia";
import useAlterarNoticia from "../hooks/useAlterarNoticia";
import axios from "axios";
import { BASE_URL } from "../util/constants";


const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const schema = z.object({
  titulo: z
    .string()
    .min(1, { message: "O título deve ser informado." })
    .min(3, { message: "O título deve ter pelo menos 3 caracteres." }),
  descricao: z.string().min(1, { message: "A descição deve ser informada." }),
  capa: z
    .string()
    .min(1, { message: "A imagem deve ser informada." }),
  dataPostagem: z
    .string()
    .min(1, { message: "A data de cadastro deve ser informada." })
    .regex(regexData, { message: "Data inválida." })
    .refine(dataValida, { message: "Data inválida." }),
});

type FormNoticia = z.infer<typeof schema>;

const CadastroDeNoticiaForm = () => {
  const { watch } = useForm();
  const noticiaSelecionado = useNoticiaStore(s => s.noticiaSelecionado);
  const setNoticiaSelecionado = useNoticiaStore(s => s.setNoticiaSelecionado);

  console.log('noticia selecionado depois:' + noticiaSelecionado.id)

  const tratarNoticiaSelecionado = (noticia: Noticia) => setNoticiaSelecionado(noticia);

  // console.log("ressetou");
  const { mutate: cadastrarNoticia, error: errorCadastrar } = useCadastrarNoticia();
  const { mutate: alterarNoticia, error: errorAlterar } = useAlterarNoticia();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    setValue,
    setFocus,
    control,
  } = useForm<FormNoticia>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      titulo: "",
      descricao: "",
      dataPostagem: "",
      capa: "",
    },
  });
  // console.log(register("nome"));
  const onSubmit = ({
    titulo,
    descricao,
    dataPostagem,
    capa,
    
  }: FieldValues) => {
    const noticia: Noticia = {
      titulo: titulo,
      descricao: descricao,
      capa: capa,
      dataPostagem: new Date(
        dataPostagem.substring(6, 10) +
          "-" +
          dataPostagem.substring(3, 5) +
          "-" +
          dataPostagem.substring(0, 2)
      ),
    };
    console.log(noticia);
    if (noticiaSelecionado.id) {
      noticia.id = noticiaSelecionado.id;
      alterarNoticia(noticia);
    } else {
      cadastrarNoticia(noticia);
    }
    axios.get(`${BASE_URL}/alert?message=Notícia cadastrada com sucesso!&type=success`)
    window.location.reload();
  };

  useEffect(() => {
    setFocus("titulo");
    if (noticiaSelecionado.id) {
      reset();
      setValue("titulo", noticiaSelecionado.titulo);
      setValue("descricao", noticiaSelecionado.descricao);
      setValue("capa", noticiaSelecionado.capa);
      setValue("dataPostagem", dayjs(noticiaSelecionado.dataPostagem).format("DD/MM/YYYY"));
    }
  }, [noticiaSelecionado]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      tratarNoticiaSelecionado({} as Noticia);
    }
  }, [isSubmitSuccessful]);

  if (errorCadastrar) throw errorCadastrar;
  if (errorAlterar) throw errorAlterar;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-2">
    <label htmlFor="titulo" className="col-xl-12 mb-1 fw-bold">
      Título
    </label>
    <div className="col-xl-12">
      <input
        {...register("titulo")}
        type="text"
        id="titulo"
        className={
          errors.titulo
            ? "form-control form-control-sm is-invalid"
            : "form-control form-control-sm"
        }
      />
      <div className="invalid-feedback">{errors.titulo?.message}</div>
    </div>
  </div>

  <div className="row mb-2">
    <label htmlFor="dataPostagem" className="col-xl-6 mb-1 fw-bold">
      Data de Cadastro
    </label>
    <div className="col-xl-12">
      <input
        {...register("dataPostagem")}
        type="text"
        id="dataPostagem"
        className={
          errors.dataPostagem
            ? "form-control form-control-sm is-invalid"
            : "form-control form-control-sm"
        }
      />
      <div className="invalid-feedback">{errors.dataPostagem?.message}</div>
    </div>
  </div>

  <div className="row mb-2">
    <label htmlFor="capa" className="col-xl-12 fw-bold">
      Imagem
    </label>
    <div className="col-xl-12">
      <input
        {...register("capa")}
        type="text"
        id="capa"
        className={
          errors.capa
            ? "form-control form-control-sm is-invalid"
            : "form-control form-control-sm"
        }
      />
      <div className="invalid-feedback">{errors.capa?.message}</div>
    </div>
  </div>

  <div className="row mb-2">
    <label htmlFor="descricao" className="col-xl-12 mb-1 fw-bold">
      Descrição
    </label>
    <div className="col-xl-12 mb-2">
    <textarea
        {...register("descricao")}
        id="descricao"
        className={
          errors.descricao
            ? "form-control form-control-sm is-invalid"
            : "form-control form-control-sm"
        }
      />
      <div className="invalid-feedback">{errors.descricao?.message}</div>
    </div>
  </div>

  <div className="row mb-2">
    <div className="col-xl-10 ">
      <button type="submit" className="btn btn-success btn-sm me-2">
        {noticiaSelecionado.id ? "Alterar" : "Cadastrar"}
      </button>

      <button
        style={{marginLeft: '10px'}}
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => {
          reset();
          tratarNoticiaSelecionado({} as Noticia);
          window.location.reload();
        }}
      >
        Cancelar
      </button>
    </div>
  </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default CadastroDeNoticiaForm;