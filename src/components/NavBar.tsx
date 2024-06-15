import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoMdCart } from 'react-icons/io';
import { FaCommentDots, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import WebSocketComponent from './AlertsComponets';
import CadastroUsuarioForm from './CadastroUsuarioForm';
import LoginForm from './LoginForm'; // Importe o LoginForm aqui
import opexicon from '/opexicon.webp';
import banner1 from '/banner1.jpg';
import banner2 from '/banner2.jpg';
import banner3 from '/banner3.jpg';
import { useUserContext } from '../store/UserProvider';

function NavBar() {    
    const {estaLogado, admin} = useUserContext();
    return (
        <>
            <WebSocketComponent />
            <nav className="navbar navbar-light navbar-expand-md" id="navbaredit">
                <div className="container">
                <Link to="/" className="navbar-brand">
                        <img className="img-fluid" src={opexicon} style={{ width: "120px" }} alt="Logo One Piece" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-expanded="false" aria-label="Botão de Navegação" style={{ color: "white" }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="menu">
                        <div className="navbar-nav mr-auto">
                            <div className="dropdown">
                                <a className="nav-link nav-item dropdown-toggle" data-toggle="dropdown" href="#" style={{ color: 'white', textShadow: '2px 0px 0px black' }}>ANIME</a>
                                <div className="dropdown-menu text-left" style={{ backgroundColor: "rgba(255, 0, 0, 0.979)" }}>
                                    <Link to="episodios" className="dropdown-item">TODOS OS EPISÓDIOS</Link>
                                    <Link to="filmes" className="dropdown-item">FILMES</Link>
                                </div>
                            </div>

                            <div className="dropdown">
                                <a className="nav-link nav-item dropdown-toggle" data-toggle="dropdown" href="#" style={{ color: 'white', textShadow: '2px 0px 0px black' }}>MANGÁ</a>
                                <div className="dropdown-menu" style={{ backgroundColor: "rgba(255, 0, 0, 0.979)" }}>
                                    <Link to="volumes" className="dropdown-item">TODOS OS VOLUMES</Link>
                                </div>
                            </div>

                            <div className="dropdown">
                                <a className="nav-link nav-item dropdown-toggle" data-toggle="dropdown" href="#" style={{ color: 'white', textShadow: '2px 0px 0px black' }}>INFO</a>
                                <div className="dropdown-menu" style={{ backgroundColor: "rgba(255, 0, 0, 0.979)" }}>
                                    <Link to="personagens" className="dropdown-item">PERSONAGENS</Link>
                                </div>
                            </div>

                            <div className="dropdown">
                                <a className="nav-link nav-item dropdown-toggle" data-toggle="dropdown" href="#" style={{ color: 'white', textShadow: '2px 0px 0px black' }}>LOJA</a>
                                <div className="dropdown-menu" style={{ backgroundColor: "rgba(255, 0, 0, 0.979)" }}>
                                    <Link to="loja" className="dropdown-item">PRODUTOS</Link>
                                    {(estaLogado() && admin()) && (
                                        <Link to="cadastrar-produto" className="dropdown-item">ADICIONAR PRODUTO</Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        <NavLink to='/carrinho'>
                            <IoMdCart style={{ color: "white", fontSize: '20px', marginRight: '22px' }} />
                        </NavLink>

                        <div className="navbar-nav">
                            {
                                estaLogado() ? (<button className="nav-item nav-link btn" type="button" onClick={() => { localStorage.removeItem('user'); window.location.reload()}} style={{
                                    color: 'white',
                                    textShadow: '2px 0px 0px black',
                                    fontFamily: 'Bree Serif',
                                    fontSize: '16px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '10px', // Ajuste a margem conforme necessário
                                }}>
                                    <FaSignOutAlt style={{ marginRight: '5px' }} />
                                    Logout
                                </button>)
                            : 
                            
                            <><button className="nav-item nav-link btn" type="button" data-toggle="modal" data-target="#cadastroUsuario" style={{
                                        color: 'white',
                                        textShadow: '2px 0px 0px black',
                                        fontFamily: 'Bree Serif',
                                        fontSize: '16px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <FaUserPlus style={{ marginRight: '5px' }} />
                                        Cadastrar
                                    </button><button className="nav-item nav-link btn" type="button" data-toggle="modal" data-target="#login" style={{
                                        color: 'white',
                                        textShadow: '2px 0px 0px black',
                                        fontFamily: 'Bree Serif',
                                        fontSize: '16px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: '10px', // Ajuste a margem conforme necessário
                                    }}>
                                            <FaSignInAlt style={{ marginRight: '5px' }} />
                                            Login
                                        </button></>}
                        
                        </div>
                    </div>
                </div>
            </nav>

            {/* Outros conteúdos do NavBar (carousel, mensagem de banner, etc.) */}

            {/* Modal de Cadastro de Usuário */}
            <div className="modal fade" id="cadastroUsuario">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="modal-title">Cadastro de Usuário</span>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <CadastroUsuarioForm />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Login */}
            <div className="modal fade" id="login">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="modal-title">Login de Usuário</span>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>

                <div className="container">
            <div className="col-lg-12" id="message">
                <div className="text-center">
                    <FaCommentDots style={{ color: "white"}}/>
                </div>

                <p> <a 
                    data-trigger="hover"
                    data-toggle="tooltip" 
                    data-placement="right"
                    data-html="true"
                    title="海賊王に俺はなる!"
                    >"EU VOU SER O REI DOS PIRATAS!!!" ― LUFFY, CHAPÉU DE PALHA</a></p>
        </div>

            </div>
        </>
    );
}

export default NavBar;
