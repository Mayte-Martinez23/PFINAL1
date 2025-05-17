import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
`;

const Form = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e40af;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
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

const Text = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #475569;

  a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Registro:", data);
    alert("Usuario registrado correctamente");
    navigate("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Registrar Médico</Title>
        <Input {...register("name")} placeholder="Nombre completo" required />
        <Input {...register("email")} type="email" placeholder="Correo" required />
        <Input {...register("password")} type="password" placeholder="Contraseña" required />
        <Button type="submit">Registrar</Button>
        <Text>
          ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
        </Text>
      </Form>
    </Container>
  );
};

export default Register;
