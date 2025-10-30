import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            api.get('/users/profile')
                .then(response => {
                    setUser(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    api.defaults.headers.Authorization = undefined;
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const signIn = async (email, senha) => {
        try {
            const response = await api.post('/auth/login', { email, senha });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setUser(user);
            return true;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erro ao fazer login.');
        }
    };

    const signOut = () => {
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        setUser(null);
    };

    if (loading) {
        return <div>Carregando Autenticação...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
