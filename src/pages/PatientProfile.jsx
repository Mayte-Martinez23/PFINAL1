import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const PatientProfile = () => {
  const { id } = useParams();
  const [historiales, setHistoriales] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/historiales/paciente/${id}`)
      .then(res => res.json())
      .then(data => {
        setHistoriales(data);
        if (data.length > 0) {
          setPaciente(data[0].paciente);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Perfil de {paciente.nombre}</h1>
        <p><strong>Correo:</strong> {paciente.email}</p>
        <p><strong>Dirección:</strong> {paciente.direccion}</p>
        <p><strong>Teléfono:</strong> {paciente.telefono}</p>
        <p><strong>RFC:</strong> {paciente.rfc}</p>

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
    </div>
  );
};

export default PatientProfile;