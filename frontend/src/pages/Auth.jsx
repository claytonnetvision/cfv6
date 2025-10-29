import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import api from '../services/api';

const AuthContainer = styled.div`
  padding: 40px 5%;
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
  background-color: var(--color-white);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  width: 100%;
  padding: 12px;
  font-size: 1.1em;
  margin-top: 10px;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #e04000;
  }
`;

const SwitchButton = styled.p`
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  color: var(--color-text);

  span {
    color: var(--color-primary);
    font-weight: 600;
  }
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    data_nascimento: '',
    bio: '',
    telefone: '', // NOVO
    endereco: '', // NOVO
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/auth/login' : '/auth/register';
      const response = await api.post(url, formData);
      
      // Armazenar token e redirecionar
      localStorage.setItem('token', response.data.token);
      alert(isLogin ? 'Login realizado com sucesso!' : 'Registro realizado com sucesso!');
      window.location.href = '/comunidade'; // Redirecionar para a comunidade
    } catch (error) {
      alert(`Erro: ${error.response.data.message || 'Ocorreu um erro.'}`);
    }
  };

  return (
    <Layout>
      <AuthContainer>
        <FormWrapper>
          <Title>{isLogin ? 'Login' : 'Criar Conta'}</Title>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <Input type="text" name="nome" placeholder="Nome Completo" onChange={handleChange} required />
                <Input type="tel" name="telefone" placeholder="Telefone (Ex: 31999998888)" onChange={handleChange} /> {/* NOVO */}
                <Input type="text" name="endereco" placeholder="Endereço Completo" onChange={handleChange} /> {/* NOVO */}
                <Input type="date" name="data_nascimento" onChange={handleChange} />
                <textarea name="bio" placeholder="Fale um pouco sobre você..." onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
              </>
            )}
            <Input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
            <Input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />
            <Button type="submit">{isLogin ? 'Entrar' : 'Registrar'}</Button>
          </form>
          <SwitchButton onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
            <span>{isLogin ? 'Crie uma agora!' : 'Faça login!'}</span>
          </SwitchButton>
        </FormWrapper>
      </AuthContainer>
    </Layout>
  );
};

export default Auth;
