import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/AuthContext";

const gradientMove = keyframes`
  0% { background-position: 50% 50%; }
  50% { background-position: 55% 45%; }
  100% { background-position: 50% 50%; }
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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 320px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
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
`;

const TextArea = styled.textarea`
  padding: 0.5rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
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
  &:hover { background-color: #1e40af; }
`;

const PatientProfile = () => {
  const { id } = useParams();
  const { doctor } = useAuth();
  const [historiales, setHistoriales] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    tipoHistorialId: "",
  });
  const [formError, setFormError] = useState("");

  // Fetch historial and paciente info
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/historiales/paciente/${id}`)
      .then(res => res.json())
      .then(data => {
        setHistoriales(data);
        if (data.length > 0) setPaciente(data[0].paciente);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Fetch tipos de historial for dropdown
  useEffect(() => {
    fetch("http://localhost:8080/tipo-historial")
      .then(res => res.json())
      .then(data => setTipos(data))
      .catch(() => setTipos([]));
  }, []);

  const handleOpenForm = () => {
    setForm({ titulo: "", descripcion: "", tipoHistorialId: "" });
    setFormError("");
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.titulo || !form.descripcion || !form.tipoHistorialId) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }
    try {
      const payload = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      tipoHistorialId: parseInt(form.tipoHistorialId),
      doctor: { id: doctor.id },
      paciente: { id: parseInt(id) },
    };
      const res = await fetch("http://localhost:8080/historiales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        // Refresh historial list
        fetch(`http://localhost:8080/historiales/paciente/${id}`)
          .then(res => res.json())
          .then(data => setHistoriales(data));
        setShowForm(false);
      } else {
        setFormError("No se pudo agregar el historial.");
      }
    } catch {
      setFormError("Error de conexión con el servidor.");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="p-6 max-w-3xl mx-auto">Cargando...</div>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div>
        <Navbar />
        <div className="p-6 max-w-3xl mx-auto">No se encontró información del paciente.</div>
      </div>
    );
  }

  return (
    <div>
      <Background />
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Perfil de {paciente.nombre}</h1>
        <p><strong>Correo:</strong> {paciente.email}</p>
        <p><strong>Dirección:</strong> {paciente.direccion}</p>
        <p><strong>Teléfono:</strong> {paciente.telefono}</p>
        <p><strong>RFC:</strong> {paciente.rfc}</p>

        <div className="flex justify-end my-4">
          <Button type="button" onClick={handleOpenForm}>Agregar Historial</Button>
        </div>

        <h2 className="text-xl font-semibold mb-2 mt-6">Historial médico</h2>
        {historiales.length === 0 ? (
          <p>No hay historiales para este paciente.</p>
        ) : (
          <ul className="space-y-4">
            {historiales.map(historial => (
              <li key={historial.id} className="bg-white p-3 shadow rounded">
                <strong>{historial.titulo}</strong>
                <div className="text-sm text-gray-600 mb-1">
                  Fecha: {new Date(historial.fechaCreado).toLocaleDateString()}
                </div>
                <div>{historial.descripcion}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showForm && (
        <ModalOverlay>
          <Modal>
            <h3 className="text-lg font-bold mb-2">Agregar Historial</h3>
            <Form onSubmit={handleSubmit}>
              <Input
                name="titulo"
                placeholder="Título"
                value={form.titulo}
                onChange={handleChange}
                required
              />
              <TextArea
                name="descripcion"
                placeholder="Descripción"
                rows={4}
                value={form.descripcion}
                onChange={handleChange}
                required
              />
              <Select
                name="tipoHistorialId"
                value={form.tipoHistorialId}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona tipo de historial</option>
                {tipos.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </Select>
              {formError && <div style={{ color: "red" }}>{formError}</div>}
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <Button type="submit">Guardar</Button>
                <Button type="button" style={{ background: "#aaa" }} onClick={handleCloseForm}>Cancelar</Button>
              </div>
            </Form>
          </Modal>
        </ModalOverlay>
      )}
    </div>
  );
};

export default PatientProfile;