import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import PatientList from "../components/PatientList";
import PatientForm from "../components/PatientForm";
import Calendar from "../components/Calendar";

const gradientMove = keyframes`
  0% {
    background-position: 50% 50%;
  }
  50% {
    background-position: 55% 45%;
  }
  100% {
    background-position: 50% 50%;
  }
`;

const Background = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(circle at 50% 50%,rgb(255, 255, 255) 0%,rgb(132, 133, 216) 40%,rgb(162, 169, 201) 70%, #fff 100%);
  background-size: 200% 200%;
  animation: ${gradientMove} 8s ease-in-out infinite;
`;

const Container = styled.div`
  /*background-color: #f9fafb;*/
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e40af;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media(min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Dashboard = () => {
  return (
    <Container>
      <Background />
      <Navbar />
      <Content>
        <Header>Panel del Médico</Header>
        <Grid>
          <PatientList />
          <PatientForm />
        </Grid>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
