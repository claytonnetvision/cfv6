import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth.jsx';

const RatingContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-top: 30px;
`;

const Title = styled.h3`
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 20px;
`;

const Criterion = styled.div`
  margin-bottom: 15px;
`;

const CriterionName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: ${props => (props.filled ? '#ffc107' : '#e4e5e9')};
`;

const AverageRating = styled.div`
  margin-left: 15px;
  font-size: 0.9rem;
  color: #666;
`;

const RatingSection = ({ profileUserId }) => {
    const { user: loggedInUser } = useAuth();
    const [criteria, setCriteria] = useState([]);
    const [averageRatings, setAverageRatings] = useState([]);
    const [userRatings, setUserRatings] = useState({}); // Armazena as avaliações do usuário logado
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [criteriaRes, ratingsRes] = await Promise.all([
                    api.get('/ratings/criteria'),
                    api.get(`/ratings/${profileUserId}`)
                ]);
                setCriteria(criteriaRes.data);
                setAverageRatings(ratingsRes.data.averageRatings);
                setUserRatings(ratingsRes.data.userRatings);
            } catch (error) {
                console.error("Erro ao carregar dados de avaliação:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [profileUserId]);

    const handleRate = async (criterionId, ratingValue) => {
        if (!loggedInUser) {
            alert('Você precisa estar logado para avaliar.');
            return;
        }

        if (loggedInUser.id === profileUserId) {
            alert('Você não pode se auto-avaliar.');
            return;
        }

        try {
            await api.post('/ratings', {
                rated_user_id: profileUserId,
                criterion_id: criterionId,
                rating_value: ratingValue
            });

            // Atualiza a avaliação do usuário localmente para feedback imediato
            setUserRatings(prev => ({ ...prev, [criterionId]: ratingValue }));

            // Recarrega as médias para refletir o novo voto
            const ratingsRes = await api.get(`/ratings/${profileUserId}`);
            setAverageRatings(ratingsRes.data.averageRatings);

            alert('Avaliação registrada com sucesso!');
        } catch (error) {
            alert(`Erro ao avaliar: ${error.response?.data?.message || 'Tente novamente.'}`);
        }
    };

    if (loading) return <RatingContainer>Carregando avaliações...</RatingContainer>;

    return (
        <RatingContainer>
            <Title>Avaliações da Comunidade</Title>
            {criteria.map(criterion => {
                const avgRating = averageRatings.find(r => r.criterion_id === criterion.id);
                const userVote = userRatings[criterion.id] || 0;

                return (
                    <Criterion key={criterion.id}>
                        <CriterionName>{criterion.name}</CriterionName>
                        <StarsContainer>
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                    key={star}
                                    filled={star <= userVote}
                                    onClick={() => handleRate(criterion.id, star)}
                                >
                                    ★
                                </Star>
                            ))}
                            {avgRating && (
                                <AverageRating>
                                    Média: <strong>{avgRating.average_rating}</strong> ({avgRating.total_votes} votos)
                                </AverageRating>
                            )}
                            {!avgRating && (
                                <AverageRating>
                                    Ainda não há votos para este critério.
                                </AverageRating>
                            )}
                        </StarsContainer>
                    </Criterion>
                );
            })}
        </RatingContainer>
    );
};

export default RatingSection;
