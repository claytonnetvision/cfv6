import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import api from '../services/api';
import { Link } from 'react-router-dom';

const RankingContainer = styled.div`
  padding: 40px 5%;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 40px;
  font-size: 3em;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const RegisterButton = styled(Link)`
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;

  &:hover {
    background-color: darken(var(--color-primary), 10%);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: var(--color-white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

// Lista de exercícios para o ranking
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

const Ranking = () => {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    fetchRanking();
  }, [selectedExercise]);

  const fetchRanking = async () => {
    try {
      // O nome do exercício precisa ser formatado para a URL (removendo espaços)
      const urlExercise = selectedExercise.replace(/\s/g, '');
      const response = await api.get(`/prs/ranking/${urlExercise}`);
      setRankingData(response.data);
    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
      setRankingData([]);
    }
  };

  return (
    <Layout>
      <RankingContainer>
        <Title>Ranking de Personal Records (PRs)</Title>

        <Controls>
            <label htmlFor="exercise-select">Selecione o Exercício: </label>
            <Select
              id="exercise-select"
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
            >
              {exercises.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </Select>

            <RegisterButton to="/register-pr">
                Registrar Meu PR
            </RegisterButton>
        </Controls>

        <Table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Atleta</th>
              <th>{selectedExercise}</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.length > 0 ? (
              rankingData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nome}</td>
                  <td>{item.valor}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum PR registrado para este exercício ainda.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </RankingContainer>
    </Layout>
  );
};

export default Ranking;
