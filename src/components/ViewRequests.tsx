import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';

interface FormSubmission {
  id: string;
  formData: {
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
  };
  status: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

const ViewRequests: React.FC = () => {
  const [requests, setRequests] = useState<FormSubmission[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<FormSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot: QuerySnapshot = await getDocs(collection(db, 'formSubmissions'));
        const requestsData: FormSubmission[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FormSubmission[];
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const openModal = (request: FormSubmission) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todas las Solicitudes</h1>
      <ul>
        {requests.map(request => (
          <li key={request.id} className="mb-4 p-4 bg-white rounded shadow-md">
            <p>{request.formData?.nombres} {request.formData?.apellido}</p>
            <p>Motivo: {request.formData?.motivo}</p>
            <p>Status: {request.status}</p>
            <p>Timestamp: {new Date(request.timestamp?.seconds * 1000).toLocaleString()}</p>
            <button
              onClick={() => openModal(request)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Ver Detalles
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Detalles de la Solicitud</h2>
            <p><strong>Nombres:</strong> {selectedRequest.nombres}</p>
            <p><strong>Apellidos:</strong> {selectedRequest.apellido}</p>
            <p><strong>Cargo:</strong> {selectedRequest.cargo}</p>
            <p><strong>Identificación:</strong> {selectedRequest.identificacion}</p>
            <p><strong>Desde:</strong> {selectedRequest.desdeReunion}</p>
            <p><strong>Hasta:</strong> {selectedRequest.hastaReunion}</p>
            <p><strong>Total Días:</strong> {selectedRequest.totalDias}</p>
            <p><strong>A partir de:</strong> {selectedRequest.aPartirDe}</p>
            <p><strong>Hasta las:</strong> {selectedRequest.hastaLas}</p>
            <p><strong>Total Horas:</strong> {selectedRequest.totalHoras}</p>
            <p><strong>Motivo:</strong> {selectedRequest.motivo}</p>
            <p><strong>Justificación:</strong> {selectedRequest.justificacion}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <p><strong>Timestamp:</strong> {new Date(selectedRequest.timestamp.seconds * 1000).toLocaleString()}</p>
            <p><strong>Timestamp:</strong> {new Date(selectedRequest.timestamp.seconds * 1000).toLocaleString()}</p>
            <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRequests;
