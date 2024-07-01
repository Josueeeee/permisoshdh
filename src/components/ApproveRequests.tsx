import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { FormSubmission } from '../types';

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

      // Actualizar la lista de solicitudes localmente después de la actualización exitosa
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId ? { ...request, status } : request
        )
      );
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
          <li key={request.id} className="mb-4 p-4 bg-white rounded shadow-md">
            <p>{request.formData?.nombres} {request.formData?.apellido}</p>
            <p>Motivo: {request.formData?.motivo}</p>
            <p>Status: {request.status}</p>
            <button
              onClick={() => handleUpdateStatus(request.id, 'approved')}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Aprobar
            </button>
            <button
              onClick={() => handleUpdateStatus(request.id, 'rejected')}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Rechazar
            </button>
            <button
              onClick={() => handleViewDetails(request)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Ver Detalles
            </button>
          </li>
        ))}
      </ul>

      {/* Modal o sección para mostrar detalles de la solicitud */}
      {selectedRequest && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Detalles de la Solicitud</h2>
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
            <button
              onClick={handleCloseDetails}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
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
