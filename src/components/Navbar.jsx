import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #1e3a8a; /* azul oscuro */
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 8px rgba(30, 58, 138, 0.4);
`;

const Title = styled.h1`
  font-size: 2rem;      /* un poco más grande */
  font-weight: 700;
  color: white;         /* aseguramos blanco */
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #60a5fa; /* azul claro */
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Title>Control de Citas</Title>
      <NavLinks>
        <StyledLink to="/dashboard">Inicio</StyledLink>
        <StyledLink to="/register">Registrar Médico</StyledLink>
        <StyledLink to="/">Cerrar sesión</StyledLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
