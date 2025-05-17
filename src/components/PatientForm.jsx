
import { useForm } from "react-hook-form";
import styled from "styled-components";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 5px rgba(37, 99, 235, 0.5);
  }
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e40af;
  }
`;

const PatientForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Paciente creado:", data);
    alert("Paciente creado correctamente");
    reset();
  };

  return (
    <Container>
      <Title>Agregar Paciente</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("nombre")} placeholder="Nombre completo" required />
        <Input {...register("email")} type="email" placeholder="Correo electrónico" required />
        <Input {...register("telefono")} placeholder="Teléfono" />
        <Button type="submit">Agregar</Button>
      </Form>
    </Container>
  );
};

export default PatientForm;
