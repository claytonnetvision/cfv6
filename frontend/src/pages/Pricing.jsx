import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import PriceCard from '../components/PriceCard';

const PricingContainer = styled.div`
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

const ScheduleSection = styled.div`
  margin-top: 60px;
  padding: 30px;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: var(--color-secondary);
    margin-bottom: 20px;
    font-size: 2em;
    text-align: center;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.8;
  }

  ul {
    list-style: none;
    text-align: left;
    padding: 0;
  }

  li {
    margin-bottom: 8px;
    font-size: 1.1em;
    font-weight: 600;
    color: var(--color-text);
  }
`;

const WHATSAPP_NUMBER = '31997209998';
const WHATSAPP_BASE_URL = `https://api.whatsapp.com/send?phone=55${WHATSAPP_NUMBER}`;

const plans = [
  {
    title: '5x na Semana (Anual)',
    price: 'R$ 284,90/mês',
    features: ['Acesso 5x por semana', 'Aulas Livres', '12 parcelas', 'Melhor custo-benefício'],
    featured: true,
    details: '1 entrada + 11 parcelas de R$ 284,90',
    whatsappLink: `${WHATSAPP_BASE_URL}&text=Ol%C3%A1%2C%20gostaria%20de%20me%20matricular%20no%20Plano%20Anual%20(5x%20na%20Semana).`
  },
  {
    title: '5x na Semana (Mensal)',
    price: 'R$ 383,90/mês',
    features: ['Acesso 5x por semana', 'Aulas Livres', 'Renovação mensal', 'Sem fidelidade'],
    featured: false,
    details: '1 parcela de R$ 383,90',
    whatsappLink: `${WHATSAPP_BASE_URL}&text=Ol%C3%A1%2C%20gostaria%20de%20me%20matricular%20no%20Plano%20Mensal%20(5x%20na%20Semana).`
  },
  {
    title: '3x na Semana (Anual)',
    price: 'R$ 251,90/mês',
    features: ['Acesso 3x por semana', 'Aulas Livres', '12 parcelas', 'Ideal para iniciantes'],
    featured: false,
    details: '1 entrada + 11 parcelas de R$ 251,90',
    whatsappLink: `${WHATSAPP_BASE_URL}&text=Ol%C3%A1%2C%20gostaria%20de%20me%20matricular%20no%20Plano%20Anual%20(3x%20na%20Semana).`
  },
  {
    title: '3x na Semana (Mensal)',
    price: 'R$ 346,50/mês',
    features: ['Acesso 3x por semana', 'Aulas Livres', 'Renovação mensal', 'Sem fidelidade'],
    featured: false,
    details: '1 parcela de R$ 346,50',
    whatsappLink: `${WHATSAPP_BASE_URL}&text=Ol%C3%A1%2C%20gostaria%20de%20me%20matricular%20no%20Plano%20Mensal%20(3x%20na%20Semana).`
  },
];

const Pricing = () => {
  return (
    <Layout>
      <PricingContainer>
        <Title>Planos e Valores CFV6 BOX</Title>

        <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.2em', fontWeight: '600' }}>
          Taxa de Matrícula de R$ 100,00 para novos alunos (cobrada apenas na primeira mensalidade).
        </p>

        <Grid>
          {plans.map((plan, index) => (
            <PriceCard key={index} {...plan} />
          ))}
        </Grid>

        <ScheduleSection>
          <h2>Horários (Livre)</h2>
          <ul>
            <li>**Segunda a Sexta:** 6:15 / 7:15 / 8:15 / 9:15 / 12:30 / 16:00 / 17:00 / 18:00 / 19:00 e 20:00</li>
            <li>**(Atenção: Sexta, último horário às 19:00)**</li>
            <li>**Sábados:** TEAM WOD às 9:00 HORAS</li>
          </ul>
          <p style={{ marginTop: '20px', fontSize: '1.1em', textAlign: 'center' }}>
            **AULA AVULSA: R$ 50,00**
          </p>
        </ScheduleSection>

        <ScheduleSection>
          <h2>Promoções Especiais</h2>
          <p>
            **Recorrente Anual (5x):** 1 entrada + 11 parcelas de R$ 313,39 (R$ 284,90 + 10%)
          </p>
          <p>
            **Recorrente Anual (3x):** 1 entrada + 11 parcelas de R$ 277,09 (R$ 251,90 + 10%)
          </p>
          <p style={{ fontStyle: 'italic', color: '#666' }}>*Os valores entre parênteses são o valor base, e o valor final já inclui o acréscimo de 10% (R$ 284,90 + 10% = R$ 313,39 e R$ 251,90 + 10% = R$ 277,09).</p>
        </ScheduleSection>

      </PricingContainer>
    </Layout>
  );
};

export default Pricing;
