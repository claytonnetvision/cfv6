import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx'; // Novo
import GlobalStyle from './styles/GlobalStyle';

// Páginas
import Home from './pages/Home';
import Training from './pages/Training';
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import Auth from './pages/Auth';
import Community from './pages/Community';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import RegisterPR from './pages/RegisterPR'; // Importar a nova página
import WOD from './pages/WOD'; // Novo

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treinamentos" element={<Training />} />
        <Route path="/valores" element={<Pricing />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/comunidade" element={<Community />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/wod" element={<WOD />} /> {/* Nova Rota */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/register-pr" element={<RegisterPR />} /> {/* Nova Rota */}
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
