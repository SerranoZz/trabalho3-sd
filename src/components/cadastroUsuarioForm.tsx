import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CadastroUsuarioForm = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://192.168.0.7:8080/usuarios', data);
            console.log('Usuário cadastrado com sucesso:', response.data);
            alert('Usuário cadastrado com sucesso!');
            reset(); 
            onClose(); 
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
                <label htmlFor="email" className="form-label">Email:</label>
                <input {...register('email', { required: true })} type="email" className="form-control" id="email" />
                {errors.email && <span>Email é obrigatório</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha:</label>
                <input {...register('senha', { required: true })} type="password" className="form-control" id="senha" />
                {errors.senha && <span>Senha é obrigatória</span>}
            </div>
            <button type="button" button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">Cancelar</button>
            <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
    );
};

export default CadastroUsuarioForm;
