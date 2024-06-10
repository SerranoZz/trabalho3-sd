import dayjs from "dayjs";
import useNoticias from "../hooks/useNoticias";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const { data: noticias, isLoading, error } = useNoticias();
  
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
                        <p className="text" id="news-time">{dayjs(noticia.data_cadastro).format("DD/MM/YYYY")}</p>
                      </div>
                      <p className="card-text text-justify" id="news-info">{noticia.descricao}</p>
                </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
export default HomePage