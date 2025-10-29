import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treinamentos" element={<Training />} />
        <Route path="/valores" element={<Pricing />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/comunidade" element={<Community />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register-pr" element={<RegisterPR />} /> {/* Nova Rota */}
      </Routes>
    </Router>
  );
};

export default App;
