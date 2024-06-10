import { create } from "zustand";
import Noticia from "../interfaces/noticia";

interface NoticiaStore {
    noticiaSelecionado: Noticia;

    setNoticiaSelecionado: (noticiaSelecionado: Noticia) => void;
}

const useNoticiaStore = create<NoticiaStore>((set) => ({
    noticiaSelecionado: {} as Noticia,

    setNoticiaSelecionado: (noticiaSelecionado: Noticia) => set(() => ({noticiaSelecionado: noticiaSelecionado}))
}));
export default useNoticiaStore;