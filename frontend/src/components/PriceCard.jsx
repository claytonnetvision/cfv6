import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease;
  border-top: 5px solid ${props => props.featured ? 'var(--color-primary)' : 'transparent'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: var(--color-primary);
    margin-bottom: 10px;
  }

  .price {
    font-size: 2.5em;
    font-weight: 700;
    color: var(--color-secondary);
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    margin-bottom: 30px;
    text-align: left;
    padding-left: 20px;
  }

  li {
    margin-bottom: 10px;
    position: relative;

    &::before {
      content: '✓';
      color: var(--color-primary);
      font-weight: 700;
      margin-right: 10px;
    }
  }

  a {
    display: block;
    background-color: var(--color-primary);
    color: var(--color-white);
    font-size: 1.1em;
    width: 100%;
    padding: 15px;
    border-radius: 4px;

    &:hover {
      background-color: #e04000;
    }
  }
`;

const PriceCard = ({ title, price, features, featured, whatsappLink }) => {
  return (
    <Card featured={featured}>
      <h3>{title}</h3>
      <div className="price">{price}</div>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Matricule-se</a>
    </Card>
  );
};

export default PriceCard;
