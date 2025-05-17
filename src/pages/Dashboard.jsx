import styled from "styled-components";
import Navbar from "../components/Navbar";
import PatientList from "../components/PatientList";
import PatientForm from "../components/PatientForm";
import Calendar from "../components/Calendar";

const Container = styled.div`
  background-color: #f9fafb;
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
