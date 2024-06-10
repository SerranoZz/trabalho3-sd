import dayjs from "dayjs";
import 'dayjs/locale/pt-br'; 
import useNoticias from "../hooks/useNoticias";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CadastroDeNoticiasForm from "../components/CadastroDeNoticiasForm";
import { AiFillPlusCircle } from "react-icons/ai";

dayjs.locale('pt-br');
const HomePage = () => {
  
  const { data: noticias, isLoading, error } = useNoticias();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const showForm = () => {
    if (mostrarFormulario){
      setMostrarFormulario(false);
    }else{
      setMostrarFormulario(true);
    }
  };
  
  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar as notícias</p>
  return (
    <>
    <div className='container'>
      <div className="row">
        {noticias?.map((noticia) =>
          <div className="col-lg-4 col-md-6" style={{padding: "0px 5px 0px 5px"}}>
            <NavLink  to={`/noticia/${noticia.id}`} id="news-link">
                <div className="card mb-3" style={{border: '0px'}}>
                  <img src={noticia.capa} alt="Spoiler" style={{height:'188px'}}/>
                      <div className="text-left">
                        <h5 className="card-title" id="news-title">{noticia.titulo.toUpperCase()}</h5>
                        <p className="text" id="news-time">{dayjs(noticia.dataPostagem).date()} de {dayjs(noticia.dataPostagem).format('MMMM')} de {dayjs(noticia.dataPostagem).year()}</p>
                      </div>
                      <p className="card-text text-justify" id="news-info">{noticia.descricao}</p>
                </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
    
    {mostrarFormulario && (
        <div className="overlay">
          <div className="overlay-content">
            <CadastroDeNoticiasForm />
          </div>
        </div>
      )}

 
      <div style={{position: 'fixed', bottom: '60px', right: '20px', zIndex: '1000'}}>
        <AiFillPlusCircle type="button" onClick={() => { showForm(); }} style={{color:"rgba(255, 0, 0, 0.979)", fontSize:'50px'}} />
      </div>
    </>
  )
}
export default HomePage