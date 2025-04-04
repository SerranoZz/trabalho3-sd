import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from '../util/constants';
import { useUsuarioContext } from '../store/UsuarioProvider';

const LoginForm = ({ onClose }) => { 
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loginError, setLoginError] = useState(null); 
    const [loginSuccess, setLoginSuccess] = useState(false); 
    const {usuario, setUsuario} = useUsuarioContext();

    const onSubmit = async (data) => {
        console.log("login", data);
        try {
            const response = await axios.post(`${BASE_URL}/usuarios/login`, data);
            
            if (response.status === 200) {
                console.log('Usuário logado com sucesso:', response.data);
                setUsuario(response.data);
                setLoginSuccess(true); 
                setTimeout(() => {
                    setLoginSuccess(false); 
                    window.location.reload();
                }, 1000);
                setLoginError(null); 
            } else {
                console.error('Erro ao realizar login:', response);
                setLoginError('Erro ao realizar login. Tente novamente mais tarde.');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            if (error.response && error.response.status === 401) {
                setLoginError('Credenciais inválidas. Verifique seu email e senha.');
            } else {
                setLoginError('Erro ao realizar login. Verifique sua conexão ou tente novamente mais tarde.');
            }
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loginError && <div className="alert alert-danger">{loginError}</div>}
            {loginSuccess && <div className="alert alert-success">Usuário logado com sucesso!</div>}
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email:</label>
                <input {...register('email', { required: true })} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                {errors.email && <span>Email é obrigatório</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Senha:</label>
                <input {...register('senha', { required: true })} type="password" className="form-control" id="exampleInputPassword1" />
                {errors.senha && <span>Senha é obrigatória</span>}
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-primary" id="submit_button" data-dismiss="modal" aria-label="Close">Cancelar</button>
                <button type="submit" className="btn btn-primary" id="submit_button" style={{marginLeft:'12px'}}>Login</button>
            </div>
        </form>
    );
};

export default LoginForm;
