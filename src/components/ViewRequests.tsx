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
<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
  <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-transform duration-300 ease-in-out scale-100">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Detalles de la Solicitud</h2>
    <div className="space-y-4 text-gray-700">
      <p><strong>Nombres:</strong> {request.nombres}</p>
      <p><strong>Cargo:</strong> {request.cargo}</p>
      <p><strong>Identificación:</strong> {request.identificacion}</p>
      {request.desdeReunion && (
        <p><strong>Desde:</strong> {request.desdeReunion}</p>
      )}
      {request.hastaReunion && (
        <p><strong>Hasta:</strong> {request.hastaReunion}</p>
      )}
      <p><strong>Total Días:</strong> {request.totalDias}</p>
      {request.aPartirDe && (
        <p><strong>A partir de:</strong> {request.aPartirDe}</p>
      )}
      {request.hastaLas && (
        <p><strong>Hasta las:</strong> {request.hastaLas}</p>
      )}
      <p><strong>Total Horas:</strong> {request.totalHoras}</p>
      <p><strong>Motivo:</strong> {request.motivo}</p>
      <p><strong>Justificación:</strong> {request.justificacion}</p>
      <p><strong>Status:</strong> <span className={`inline-block px-2 py-1 rounded ${request.status === 'approved' ? 'bg-green-100 text-green-800' : request.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{request.status}</span></p>
      {request.timestamp && (
        <p><strong>Timestamp:</strong> {new Date(request.timestamp.seconds * 1000).toLocaleString()}</p>
      )}
    </div>
    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-6 hover:bg-red-600 transition duration-200 w-full">
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
          <li key={request.id} className="mb-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-800">{request?.nombres} {request?.apellido}</p>
            <p className="text-gray-600"><strong>Motivo:</strong> {request?.motivo}</p>
            <p className="text-gray-600"><strong>Status:</strong> <span className={`inline-block px-2 py-1 rounded ${request.status === 'approved' ? 'bg-green-100 text-green-800' : request.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{request.status}</span></p>
            {request.timestamp && (
              <p className="text-gray-600"><strong>Timestamp:</strong> {new Date(request.timestamp.seconds * 1000).toLocaleString()}</p>
            )}
          </div>
          <button
            onClick={() => openModal(request)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-200 w-full"
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
