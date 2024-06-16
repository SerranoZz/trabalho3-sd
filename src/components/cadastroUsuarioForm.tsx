import React from 'react';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from '../util/constants';

const CadastroUsuarioForm = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/usuarios`, data);
            const confirmacao = window.confirm(`Usuário(a) ${response.data.nome} cadastrado com sucesso!`);
            if (confirmacao) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome:</label>
                <input {...register('nome', { required: true })} className="form-control" id="nome" />
                {errors.nome && <span>Nome é obrigatório</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{}}>Email:</label>
                <input {...register('email', { required: true })} type="email" className="form-control" id="email" />
                {errors.email && <span>Email é obrigatório</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha:</label>
                <input {...register('senha', { required: true })} type="password" className="form-control" id="senha" />
                {errors.senha && <span>Senha é obrigatória</span>}
            </div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close" id="submit_button">Cancelar</button>
                <button type="submit" className="btn btn-primary" id="submit_button" style={{marginLeft:'12px'}}>Cadastrar</button>
            </div>
        </form>
    );
};

export default CadastroUsuarioForm;
