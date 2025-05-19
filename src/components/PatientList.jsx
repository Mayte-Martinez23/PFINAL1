import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../auth/AuthContext";

const Container = styled.div`
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: white;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e40af;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 8px;
`;

const PatientLink = styled(Link)`
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  color: #dc2626;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #991b1b;
  }
`;

const PatientList = () => {
  const [pacientes, setPacientes] = useState([]);
  const { doctor } = useAuth();

  useEffect(() => {
    if (doctor?.id) {
      fetch(`http://localhost:8080/doctor-pacientes/doctor/${doctor.id}/pacientes`)
        .then(res => res.json())
        .then(data => setPacientes(data))
        .catch(() => setPacientes([]));
    }
  }, [doctor]);

  const eliminarPaciente = (id) => {
    if (window.confirm("¿Deseas eliminar este paciente?")) {
      setPacientes(pacientes.filter((p) => p.id !== id));
    }
  };

  return (
    <Container>
      <Title>Pacientes</Title>
      <List>
        {pacientes.map((p) => (
          <Item key={p.id}>
            <PatientLink to={`/patient/${p.id}`}>{p.nombre}</PatientLink>
            <DeleteButton onClick={() => eliminarPaciente(p.id)}>Eliminar</DeleteButton>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default PatientList;
