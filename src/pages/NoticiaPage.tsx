import { NavLink, useParams } from "react-router-dom"
import useNoticiaPorId from "../hooks/useNoticiaPorId";
import dayjs from "dayjs";
import useNoticiaStore from "../store/noticiaStore";
import Noticia from "../interfaces/noticia";
import CadastroDeNoticiasPage from "./CadastroDeNoticiasPage";
import CadastroDeNoticiasForm from "../components/CadastroDeNoticiasForm";
import { useState } from "react";

const NoticiaPage = () => { 
    const {id} = useParams();
    const { data: noticia, isLoading, error } = useNoticiaPorId(id);
    console.log(window.location.pathname)
    const setNoticiaSelecionado = useNoticiaStore(s => s.setNoticiaSelecionado);
    const tratarNoticiaSelecionado = (noticia: Noticia) => setNoticiaSelecionado(noticia);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const showForm = () => {
        if (mostrarFormulario){
        setMostrarFormulario(false);
        }else{
        setMostrarFormulario(true);
        }
    };

    if (isLoading) return <h6>Carregando...</h6>;
    
    const dataFinal = ()=> {
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

      {/* Botão de adição no canto inferior direito */}
      <div style={{position: 'fixed', bottom: '60px', right: '20px', zIndex: '1000'}}>
        <button className="btn btn-primary" onClick={() => { tratarNoticiaSelecionado(noticia); showForm(); }}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
        </>
    );
}
export default NoticiaPage;

