import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../context/authContext';

import { db } from '../types/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import ApproveRequests from './ApproveRequests';
import ViewRequests from './ViewRequests';

interface FormData {
  nombres: string;
  apellido: string;
  cargo: string;
  identificacion: string;
  desdeReunion: string;
  hastaReunion: string;
  totalDias: string;
  aPartirDe: string;
  hastaLas: string;
  totalHoras: string;
  motivo: string;
  justificacion: string;
}

const Home: React.FC = () => {
  const { user, logout, loading } = useAuth();
 

  const [formData, setFormData] = useState<FormData>({
    nombres: '',
    apellido: '',
    cargo: '',
    identificacion: '',
    desdeReunion: '',
    hastaReunion: '',
    totalDias: '',
    aPartirDe: '',
    hastaLas: '',
    totalHoras: '',
    motivo: '',
    justificacion: '',
  });

  const [permissionType, setPermissionType] = useState<string>('reunion');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPermissionType(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'formSubmissions'), {
        ...formData,
        permissionType,
        userId: user?.uid,
        email: user?.email,
        status: 'pending',
        timestamp: Timestamp.fromDate(new Date()),
      });
      console.log('Document written with ID: ', docRef.id);

      setSuccessMessage('Formulario enviado correctamente.');
      setFormData({
        nombres: '',
        apellido: '',
        cargo: '',
        identificacion: '',
        desdeReunion: '',
        hastaReunion: '',
        totalDias: '',
        aPartirDe: '',
        hastaLas: '',
        totalHoras: '',
        motivo: '',
        justificacion: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleLogOut = async () => {
    await logout();
  };

  if (loading) return <h1 className="text-2xl font-bold">Loading...</h1>;

  return (
    <div className="container mx-auto p-4">
      <p className="text-2xl font-bold mb-4">Bienvenido <span>{user?.email}</span></p>
      <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
        Salir
      </button>

      {user && user.email === 'admin@gmail.com' ? (
        <>
          <h2 className="text-xl font-bold mb-4">Gestión de Solicitudes:</h2>
          <ApproveRequests />
          <ViewRequests />
        </>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">DATOS DE DIRECTIVO SOLICITANTE</h3>
            <label className="block mb-2">
              Nombres y Apellido(s):
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              Cargo:
              <input
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              Nº Identificación:
              <input
                type="text"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </label>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">DATOS DEL PERMISO SOLICITADO</h3>
            <label className="block mb-2">
              Tipo de Permiso:
              <select
                value={permissionType}
                onChange={handlePermissionTypeChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="reunion">Permiso por Reunión</option>
                <option value="hora">Permiso por Hora</option>
              </select>
            </label>

            {permissionType === 'reunion' && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">PERMISO POR REUNIÓN</h4>
                <label className="block mb-2">
                  Desde:
                  <input
                    type="date"
                    name="desdeReunion"
                    value={formData.desdeReunion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </label>
                <label className="block mb-2">
                  Hasta:
                  <input
                    type="date"
                    name="hastaReunion"
                    value={formData.hastaReunion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </label>
                <label className="block mb-2">
                  Total Días:
                  <input
                    type="number"
                    name="totalDias"
                    value={formData.totalDias}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </label>
              </div>
            )}

            {permissionType === 'hora' && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">PERMISO POR HORA</h4>
                <label className="block mb-2">
                  A partir de:
                  <input
                    type="time"
                    name="aPartirDe"
                    value={formData.aPartirDe}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </label>
                <label className="block mb-2">
                  Hasta las:
                  <input
                    type="time"
                    name="hastaLas"
                    value={formData.hastaLas}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </label>
                <label className="block mb-2">
                  Total Horas:
                  <input
                    type="number"
                    name="totalHoras"
                    value={formData.totalHoras}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </label>
              </div>
            )}

            <label className="block mb-2">
              Motivo del Permiso:
              <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </label>
            <label className="block mb-2">
              Documento de Cita Médica u Otros:
              <input
                type="file"
                name="justificacion"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </label>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
          {successMessage && <p className="text-white mb-4 bg-green-400 p-2 mt-2">{successMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Home;
