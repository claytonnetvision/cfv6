import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: var(--color-primary);
    margin-bottom: 10px;
  }

  p {
    color: var(--color-text);
    margin-bottom: 15px;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 15px;
  }
`;

const TrainingCard = ({ title, description, image, link }) => {
  return (
    <Card>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">Saiba Mais</a>
    </Card>
  );
};

export default TrainingCard;
