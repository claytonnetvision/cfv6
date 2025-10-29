import React, { useState, useEffect } from 'react';
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

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: 20px;
  }

  a {
    color: var(--color-white);
    font-weight: 600;
    padding: 5px 0;
    position: relative;

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

  return (
    <>
      <Header>
        <Logo to="/">CFV6 BOX</Logo>
        <Nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/treinamentos">Treinamentos</Link></li>
            <li><Link to="/valores">Valores</Link></li>
            <li><Link to="/galeria">Galeria</Link></li>
            <li><Link to="/comunidade">Comunidade</Link></li>
            <li><Link to="/ranking">Ranking PR</Link></li>
            {isLoggedIn && <li><Link to="/profile">Meu Perfil</Link></li>}
            <li>
              {isLoggedIn ? (
                <AuthButton onClick={handleLogout}>Sair</AuthButton>
              ) : (
                <Link to="/login">
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
