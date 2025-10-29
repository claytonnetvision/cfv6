import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import api from '../services/api';

const RegisterPRContainer = styled.div`
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

const Select = styled.select`
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

// Lista de exercícios para o registro de PR
const exercises = [
  'Back Squat',
  'Clean and Jerk',
  'Deadlift',
  'Snatch',
  'Overhead Squat',
  'Bench Press',
  '1 Mile Run',
  '5k Run',
  'Murph',
  'Hyrox',
];

const RegisterPR = () => {
  const [exercicio, setExercicio] = useState(exercises[0]);
  const [valor, setValor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/prs', { exercicio, valor });
      alert('PR registrado com sucesso! Atualize a página de Ranking para ver seu resultado.');
      setValor('');
    } catch (error) {
      alert(`Erro ao registrar PR: ${error.response.data.message || 'Verifique se você está logado.'}`);
    }
  };

  return (
    <Layout>
      <RegisterPRContainer>
        <FormWrapper>
          <Title>Registrar Novo PR</Title>
          <form onSubmit={handleSubmit}>
            <Select value={exercicio} onChange={(e) => setExercicio(e.target.value)} required>
              {exercises.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </Select>
            <Input
              type="text"
              placeholder="Valor do PR (Ex: 150kg, 05:30, 20:45)"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
            <Button type="submit">Registrar PR</Button>
          </form>
        </FormWrapper>
      </RegisterPRContainer>
    </Layout>
  );
};

export default RegisterPR;
