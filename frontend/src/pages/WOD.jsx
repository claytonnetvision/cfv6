import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth.jsx';
import api from '../services/api';

const WODContainer = styled.div`
    padding: 2rem;
    max-width: 900px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const WODTitle = styled.h1`
    color: #333;
    text-align: center;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #ff4500;
    padding-bottom: 0.5rem;
`;

const WODCard = styled.div`
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
`;

const WODDate = styled.h2`
    color: #ff4500;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

const WODContent = styled.p`
    white-space: pre-wrap;
    line-height: 1.6;
    color: #555;
`;

const AdminSection = styled.div`
    margin-top: 3rem;
    padding: 2rem;
    border: 1px dashed #ccc;
    border-radius: 6px;
    background-color: #fff;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

const TextArea = styled.textarea`
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    min-height: 150px;
`;

const Button = styled.button`
    padding: 0.75rem;
    background-color: #ff4500;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    &:hover {
        background-color: #e04000;
    }
`;

const WOD = () => {
    const { user } = useAuth();
    const [latestWOD, setLatestWOD] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLatestWOD = async () => {
            try {
                const response = await api.get('/wods/latest');
                setLatestWOD(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setLatestWOD(null);
                } else {
                    setError('Erro ao carregar o WOD.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchLatestWOD();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/wods', { title, description, date });
            setLatestWOD(response.data);
            alert('WOD criado com sucesso!');
            setTitle('');
            setDescription('');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar WOD.');
        }
    };

    if (loading) return <WODContainer>Carregando...</WODContainer>;

    return (
        <WODContainer>
            <WODTitle>Workout do Dia</WODTitle>

            {latestWOD ? (
                <WODCard>
                    <WODDate>{new Date(latestWOD.date).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</WODDate>
                    <h2>{latestWOD.title}</h2>
                    <WODContent>{latestWOD.description}</WODContent>
                </WODCard>
            ) : (
                <WODCard>
                    <p>Nenhum WOD cadastrado ainda.</p>
                </WODCard>
            )}

            {user?.is_admin && (
                <AdminSection>
                    <h2>Área do Administrador: Cadastrar Novo WOD</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Título do WOD (Ex: Fran, Murph, 21-15-9)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <TextArea
                            placeholder="Descrição detalhada do WOD"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <Button type="submit">Cadastrar WOD</Button>
                    </Form>
                </AdminSection>
            )}
        </WODContainer>
    );
};

export default WOD;
