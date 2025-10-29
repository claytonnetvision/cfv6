import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import TrainingCard from '../components/TrainingCard';

const TrainingContainer = styled.div`
  padding: 40px 5%;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 40px;
  font-size: 3em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const trainings = [
  {
    title: 'CrossFit',
    description: 'O CrossFit é um programa de treinamento de força e condicionamento físico geral que proporciona a mais ampla adaptação fisiológica possível para qualquer tipo de pessoa.',
    image: '/crossfit.jpg',
    link: '#',
  },
  {
    title: 'Hyrox',
    description: 'O HYROX é uma corrida de fitness global que combina 1km de corrida seguido por 1 exercício funcional, repetido 8 vezes. Foco em resistência e força funcional.',
    image: '/hyrox.jpg',
    link: '#',
  },
  {
    title: 'Personal & Treinamento',
    description: 'Acompanhamento individualizado com um de nossos coaches. Ideal para quem busca resultados específicos, reabilitação ou horários flexíveis.',
    image: '/personal.jpg',
    link: '#',
  },
];

const Training = () => {
  return (
    <Layout>
      <TrainingContainer>
        <Title>Nossos Treinamentos e Metodologias</Title>
        <Grid>
          {trainings.map((t, index) => (
            <TrainingCard key={index} {...t} />
          ))}
        </Grid>
      </TrainingContainer>
    </Layout>
  );
};

export default Training;
