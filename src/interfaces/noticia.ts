interface Noticia {
  id?: number;
  capa: string;
  titulo: string;
  descricao: string;
  dataPostagem: Date; 
  
  _links: {
    self: { href: string };
    noticias: { href: string };
  };
}

export default Noticia;