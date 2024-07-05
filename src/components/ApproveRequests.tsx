import React, { useEffect, useState } from 'react';
import { db } from '../types/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

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

const ApproveRequests: React.FC = () => {
  const [requests, setRequests] = useState<FormSubmission[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<FormSubmission | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'formSubmissions'));
        const requestsData: FormSubmission[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FormSubmission[];
        setRequests(requestsData.filter(request => request.status === 'pending'));
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (requestId: string, status: string) => {
    try {
      const requestRef = doc(db, 'formSubmissions', requestId);
      await updateDoc(requestRef, { status });

      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId ? { ...request, status } : request
        )
      );
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleViewDetails = (request: FormSubmission) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Solicitudes Pendientes</h1>
      <ul>
        {requests.map(request => (
          <li key={request.id} className="mb-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
              <p className="text-lg font-semibold text-gray-800">{request?.nombres} {request?.apellido}</p>
              <p className="text-gray-600"><strong>Motivo:</strong> {request?.motivo}</p>
              <p className="text-gray-600"><strong>Status:</strong> <span className={`inline-block px-2 py-1 rounded ${request.status === 'approved' ? 'bg-green-100 text-green-800' : request.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{request.status}</span></p>
            </div>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => handleUpdateStatus(request.id, 'approved')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Aprobar
              </button>
              <button
                onClick={() => handleUpdateStatus(request.id, 'rejected')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Rechazar
              </button>
              <button
                onClick={() => handleViewDetails(request)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Ver Detalles
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">Detalles de la Solicitud</h2>
            <div className="space-y-4">
              <p><strong>Nombres:</strong> {selectedRequest.nombres}</p>
              <p><strong>Cargo:</strong> {selectedRequest.cargo}</p>
              <p><strong>Identificación:</strong> {selectedRequest.identificacion}</p>
              {selectedRequest.desdeReunion && (
                <p><strong>Desde:</strong> {selectedRequest.desdeReunion}</p>
              )}
              {selectedRequest.hastaReunion && (
                <p><strong>Hasta:</strong> {selectedRequest.hastaReunion}</p>
              )}
              <p><strong>Total Días:</strong> {selectedRequest.totalDias}</p>
              {selectedRequest.aPartirDe && (
                <p><strong>A partir de:</strong> {selectedRequest.aPartirDe}</p>
              )}
              {selectedRequest.hastaLas && (
                <p><strong>Hasta las:</strong> {selectedRequest.hastaLas}</p>
              )}
              <p><strong>Total Horas:</strong> {selectedRequest.totalHoras}</p>
              <p><strong>Motivo:</strong> {selectedRequest.motivo}</p>
              {selectedRequest.justificacion && (
                <div>
                  <p><strong>Justificación:</strong></p>
                  <a href={selectedRequest.justificacion} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Ver archivo</a>
                </div>
              )}
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              {selectedRequest.timestamp && (
                <p><strong>Timestamp:</strong> {new Date(selectedRequest.timestamp.seconds * 1000).toLocaleString()}</p>
              )}
            </div>
            <button
              onClick={handleCloseDetails}
              className="bg-green-600 text-white px-6 py-3 rounded-lg mt-6 w-full hover:bg-green-700 transition duration-200"
            >
              Cerrar Detalles
            </button>
        
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveRequests;
