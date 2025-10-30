	import React, { useState, useEffect } from 'react';
	import { Menu as MenuIcon, X as XIcon } from 'react-feather'; // Usando react-feather para ícones
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  background-color: var(--color-secondary);
  color: var(--color-white);
  padding: 15px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
	  font-size: 1.8em;
	  font-weight: 700;
	  color: var(--color-primary);
	`;
	
	const MenuToggle = styled.button`
	  display: none; /* Esconder por padrão em desktop */
	  background: none;
	  border: none;
	  color: var(--color-white);
	  cursor: pointer;
	
	  @media (max-width: 768px) {
	    display: block; /* Mostrar em mobile */
	    z-index: 1000;
	  }
	`;
	
	const Nav = styled.nav`
	  ul {
	    display: flex;
	    list-style: none;
	    gap: 20px;
	
	    @media (max-width: 768px) {
	      flex-direction: column;
	      position: fixed;
	      top: 0;
	      right: ${({ open }) => (open ? '0' : '-100%')};
	      width: 70%;
	      height: 100vh;
	      background-color: var(--color-secondary);
	      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
	      padding: 80px 20px 20px;
	      transition: right 0.3s ease-in-out;
	      z-index: 999;
	      gap: 30px;
	    }
	  }

  a {
    color: var(--color-white);
    font-weight: 600;
    padding: 5px 0;
	    position: relative;
	
	    @media (max-width: 768px) {
	      font-size: 1.2em;
	      padding: 10px 0;
	      display: block;
	    }
	
	    &::after {
	      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--color-primary);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const AuthButton = styled.button`
  background-color: transparent;
  color: var(--color-white);
  border: 1px solid var(--color-primary);
  padding: 8px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-secondary);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-secondary);
  color: var(--color-white);
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
`;

	const Layout = ({ children }) => {
	  const [isLoggedIn, setIsLoggedIn] = useState(false);
	  const [isMenuOpen, setIsMenuOpen] = useState(false); // Novo estado para o menu
	  const navigate = useNavigate();
	
	  useEffect(() => {
	    const token = localStorage.getItem('token');
	    setIsLoggedIn(!!token);
	  }, [localStorage.getItem('token')]);
	
	  const handleLogout = () => {
	    localStorage.removeItem('token');
	    setIsLoggedIn(false);
	    navigate('/login');
	  };
	
	  const handleLinkClick = () => {
	    setIsMenuOpen(false); // Fechar o menu ao clicar em um link
	  };
	
	  return (
	    <>
	      <Header>
	        <Logo to="/">CFV6 BOX</Logo>
	        
	        <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
	          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
	        </MenuToggle>
	
	        <Nav open={isMenuOpen}>
	          <ul>
	            <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
	            <li><Link to="/treinamentos" onClick={handleLinkClick}>Treinamentos</Link></li>
	            <li><Link to="/valores" onClick={handleLinkClick}>Valores</Link></li>
	            <li><Link to="/galeria" onClick={handleLinkClick}>Galeria</Link></li>
	            <li><Link to="/comunidade" onClick={handleLinkClick}>Comunidade</Link></li>
	            <li><Link to="/ranking" onClick={handleLinkClick}>Ranking PR</Link></li>
	            {isLoggedIn && <li><Link to="/profile" onClick={handleLinkClick}>Meu Perfil</Link></li>}
	            <li>
	              {isLoggedIn ? (
	                <AuthButton onClick={() => { handleLogout(); handleLinkClick(); }}>Sair</AuthButton>
	              ) : (
	                <Link to="/login" onClick={handleLinkClick}>
	                  <AuthButton>Entrar</AuthButton>
	                </Link>
	              )}
	            </li>
	          </ul>
	        </Nav>
	      </Header>
	      <main>{children}</main>
	      <Footer>
	        &copy; {new Date().getFullYear()} CFV6 BOX. Todos os direitos reservados.
	      </Footer>
	    </>
	  );
	};

export default Layout;
