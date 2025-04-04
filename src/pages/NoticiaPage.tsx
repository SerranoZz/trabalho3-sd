import { NavLink, useParams } from "react-router-dom";
import useNoticiaPorId from "../hooks/useNoticiaPorId";
import dayjs from "dayjs";
import useNoticiaStore from "../store/noticiaStore";
import Noticia from "../interfaces/noticia";
import CadastroDeNoticiasForm from "../components/CadastroDeNoticiasForm";
import { useState } from "react";
import { RiEditCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import useRemoverNoticia from "../hooks/useRemoverNoticia";
import { useUsuarioContext } from "../store/UsuarioProvider";
import { BASE_URL2 } from "../util/constants";

const NoticiaPage = () => { 
    const { id } = useParams();
    const { data: noticia, isLoading, error } = useNoticiaPorId(id);
    
    const setNoticiaSelecionado = useNoticiaStore(s => s.setNoticiaSelecionado);
    const tratarNoticiaSelecionado = (noticia: Noticia) => setNoticiaSelecionado(noticia);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const { estaLogado, admin } = useUsuarioContext();

    const {
        data: noticiaRemovido,
        mutate: removerNoticia,
        isLoading: removendo,
        error: erroRemocao,
      } = useRemoverNoticia();

    const [removido, setRemovido] = useState(false);
    const [confirmarRemocao, setConfirmarRemocao] = useState(false);

    const handleRemoverNoticia = () => {
        setConfirmarRemocao(true);
    };

    const confirmarRemocaoNoticia = () => {
        tratarRemocaoDeNoticia(noticia.id);
        setRemovido(true);
        setConfirmarRemocao(false);
        alert('Notícia removida com sucesso! Clique em OK para voltar à página inicial.');
        window.location.href = `${BASE_URL2}`;
        
    };

    const cancelarRemocaoNoticia = () => {
        setConfirmarRemocao(false);
    };

    const tratarRemocaoDeNoticia = (id: any) => {
        removerNoticia(id);
    };

    const showForm = () => {
        setMostrarFormulario(!mostrarFormulario);
    };

    if (isLoading) return <h6>Carregando...</h6>;
    
    const dataFinal = () => {
        return `${dayjs(noticia.dataPostagem).date()} de ${dayjs(noticia.dataPostagem).format('MMMM')} de ${dayjs(noticia.dataPostagem).year()}`
    }

    return (
        <>
        <div className="row justify-content-start" style={{ marginLeft: '-10px' }}>
            <div className="col-md-12">
                <div className="card text-white" style={{ border: "none", borderRadius: "0" }}>
                    <img src={noticia.capa} className="card-img" alt="Imagem de fundo" style={{
                        filter: 'blur(5px)',
                        WebkitFilter: 'blur(5px)',
                        maxHeight: '100px',
                        objectFit: 'cover',
                        border: '1px solid #ffffff',
                    }} />
                    <div className="card-img-overlay d-flex flex-column justify-content-center" style={{ padding: '0px 15px 0px 15px', marginBottom:'1.75rem' }}>
                        <h1 className="card-title" style={{fontSize:'2rem', fontFamily: 'Bree Serif', color: "black", textShadow: 'white 1.5px 0px 2px' }}>{noticia.titulo}</h1>
                    </div>
                    <p className="card-text" style={{ fontSize: '1rem', fontWeight: '400', fontFamily: 'Titillium Web', color: 'black' }}>Publicado em {dataFinal()}</p>
                </div>
            </div>
        </div>
        
        <p className="card-text text-justify" style={{fontFamily:'Merriweather', fontSize:'14px', marginTop:'1rem', wordBreak:'break-all'}}>
            {noticia.descricao}
        </p>

        {mostrarFormulario && (     
        <div className="overlay">
          <div className="overlay-content">
            <CadastroDeNoticiasForm />
          </div>
        </div>
        )}

        {(estaLogado() && admin()) && (
            <div style={{position: 'fixed', bottom: '60px', right: '20px', zIndex: '1000'}}>
              <RiEditCircleFill 
                type="button" 
                onClick={() => { tratarNoticiaSelecionado(noticia); showForm(); }} 
                style={{color:"rgba(0, 204, 0, 0.979)", fontSize:'50px'}} 
              />
              <MdDelete 
                type="button" 
                onClick={handleRemoverNoticia} 
                style={{color:"rgba(255, 0, 0, 0.979)", fontSize:'50px'}} 
              />
            </div>
        )}

        {confirmarRemocao && (
            <div className="overlay">
                <div className="overlay-content" style={{maxWidth:'300px'}}>
                    <h5>Você tem certeza que deseja remover esta notícia?</h5>
                    <button type="submit" className="btn btn-primary" id="submit_button" style={{backgroundColor:''}} onClick={confirmarRemocaoNoticia}>Sim</button>
                    <button type="submit" className="btn btn-primary" id="submit_button" style={{marginLeft:'12px'}} onClick={cancelarRemocaoNoticia}>Não</button>
                </div>
            </div>
        )}
        </>
    );
}

export default NoticiaPage;
