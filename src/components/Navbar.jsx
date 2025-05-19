import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import midoctorLogo from "../assets/midoctor.png";
import { useAuth } from "../auth/AuthContext";

const Nav = styled.nav`
  background-color: #1e3a8a; /* azul oscuro */
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 8px rgba(30, 58, 138, 0.4);
`;

const Logo = styled.img`
  height: 50px; /* Adjust size as needed */
  margin-right: 1rem;
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
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <Nav>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Logo src={midoctorLogo} alt="MiDoctor Logo" />
        <Title>Control de Citas</Title>
      </div>
      <NavLinks>
        <StyledLink to="/dashboard">Inicio</StyledLink>
        <StyledLink to="/register">Registrar Médico</StyledLink>
        <StyledLink to="/" onClick={handleLogout}>Cerrar sesión</StyledLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;