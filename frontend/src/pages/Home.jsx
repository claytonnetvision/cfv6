import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

const HeroSection = styled.section`
  background: url('/hero-bg.jpg') no-repeat center center/cover;
	  height: 60vh;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  text-align: center;
	  color: var(--color-white);
	  position: relative;
	
	  @media (max-width: 768px) {
	    height: 50vh;
	    padding: 20px;
	  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }

  div {
    position: relative;
    z-index: 1;
  }

	  h1 {
	    font-size: 3.5em;
	    margin-bottom: 10px;
	    color: var(--color-primary);
	
	    @media (max-width: 768px) {
	      font-size: 2.5em;
	    }
	  }
	
	  p {
	    font-size: 1.5em;
	    margin-bottom: 30px;
	
	    @media (max-width: 768px) {
	      font-size: 1.2em;
	    }
	  }
	
	  a {
	    background-color: var(--color-primary);
	    color: var(--color-white);
	    font-size: 1.2em;
	    padding: 15px 30px;
	
	    @media (max-width: 768px) {
	      font-size: 1em;
	      padding: 10px 20px;
	    }
    border-radius: 5px;
    display: inline-block;

    &:hover {
      background-color: #e04000;
    }
  }
`;

const Section = styled.section`
  padding: 40px 5%;
  text-align: center;

  h2 {
    font-size: 2.5em;
    margin-bottom: 30px;
    color: var(--color-secondary);
  }
`;

	const TrainingGrid = styled.div`
	  display: grid;
	  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Reduzir minmax para mobile */
	  gap: 30px;
	  margin-top: 30px;
	
	  @media (max-width: 480px) {
	    grid-template-columns: 1fr; /* Uma coluna em telas muito pequenas */
	  }
	`;

const WHATSAPP_NUMBER = '31997209998';
const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=55${WHATSAPP_NUMBER}&text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20aula%20experimental!`;

const Home = () => {
  return (
    <Layout>
      <HeroSection>
        <div>
          <h1>CFV6 BOX</h1>
          <p>Seu Box de CrossFit e Hyrox. Treine forte, viva melhor.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Agende sua Aula Experimental</a>
        </div>
      </HeroSection>

      <Section>
        <h2>Nossas Modalidades</h2>
        <TrainingGrid>
          <div className="card">
            <h3>CrossFit</h3>
            <p>Treinamento funcional de alta intensidade, variando constantemente.</p>
          </div>
          <div className="card">
            <h3>Hyrox</h3>
            <p>O desafio de fitness que combina corrida e exercícios funcionais.</p>
          </div>
          <div className="card">
            <h3>Personal & Treinamento</h3>
            <p>Acompanhamento individualizado para resultados específicos.</p>
          </div>
        </TrainingGrid>
      </Section>
    </Layout>
  );
};

export default Home;
