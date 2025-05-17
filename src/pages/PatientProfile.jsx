// src/pages/PatientProfile.jsx
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const PatientProfile = () => {
  const { id } = useParams();

  // Aquí debes reemplazar con datos reales del backend
  const paciente = {
    id,
    nombre: "Juan Pérez",
    email: "juan@example.com",
    historial: "Alergia a penicilina. Diagnóstico: hipertensión.",
    citas: [
      { fecha: "2025-05-20", hora: "10:00", motivo: "Chequeo general" },
      { fecha: "2025-06-15", hora: "09:30", motivo: "Revisión presión arterial" },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Perfil de {paciente.nombre}</h1>
        <p><strong>Correo:</strong> {paciente.email}</p>
        <p><strong>Historial médico:</strong></p>
        <p className="mb-4 bg-gray-100 p-3 rounded">{paciente.historial}</p>

        <h2 className="text-xl font-semibold mb-2">Historial de citas</h2>
        <ul className="space-y-2">
          {paciente.citas.map((cita, index) => (
            <li key={index} className="bg-white p-3 shadow rounded">
              <strong>{cita.fecha}</strong> a las <strong>{cita.hora}</strong> — {cita.motivo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientProfile;
