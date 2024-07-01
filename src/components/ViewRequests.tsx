import React, { useEffect, useState } from 'react';
import { db } from '../types/firebase';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';

interface FormSubmission {
  id: string;

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

  status: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

const Modal: React.FC<{ request: FormSubmission; onClose: () => void }> = ({ request, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4">Detalles de la Solicitud</h2>
      <p><strong>Nombres:</strong> {request.nombres}</p>
      <p><strong>Apellidos:</strong> {request.apellido}</p>
      <p><strong>Cargo:</strong> {request.cargo}</p>
      <p><strong>Identificación:</strong> {request.identificacion}</p>
      <p><strong>Desde:</strong> {request.desdeReunion}</p>
      <p><strong>Hasta:</strong> {request.hastaReunion}</p>
      <p><strong>Total Días:</strong> {request.totalDias}</p>
      <p><strong>A partir de:</strong> {request.aPartirDe}</p>
      <p><strong>Hasta las:</strong> {request.hastaLas}</p>
      <p><strong>Total Horas:</strong> {request.totalHoras}</p>
      <p><strong>Motivo:</strong> {request.motivo}</p>
      <p><strong>Justificación:</strong> {request.justificacion}</p>
      <p><strong>Status:</strong> {request.status}</p>
      <p><strong>Timestamp:</strong> {new Date(request.timestamp.seconds * 1000).toLocaleString()}</p>
      <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Cerrar
      </button>
    </div>
  </div>
);

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
            <p>{request?.nombres} {request?.apellido}</p>
            <p>Motivo: {request?.motivo}</p>
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
        <Modal request={selectedRequest} onClose={closeModal} />
      )}
    </div>
  );
};

export default ViewRequests;
