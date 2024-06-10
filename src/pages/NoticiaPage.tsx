import { useParams } from "react-router-dom"
import useNoticiaPorId from "../hooks/useNoticiaPorId";

const NoticiaPage = () => { 
    const {id} = useParams();
    const { data: noticia, isLoading, error } = useNoticiaPorId(id);

    if (isLoading) return <h6>Carregando...</h6>;
    if (error) throw error;

    return (
        <div>
            <h1>Notícia</h1>
            <p>Id: {noticia.id}</p>
        </div>
    )
}
export default NoticiaPage;