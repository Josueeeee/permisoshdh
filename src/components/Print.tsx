import React, { useEffect, useState, useRef } from 'react';
import { db } from '../types/firebase';
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';
import { useReactToPrint } from 'react-to-print';

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

const PermitForm: React.FC<{ request: FormSubmission }> = ({ request }) => (
    <div className="p-4 border-2 border-gray-300">
        <h1 className="text-center text-xl font-bold mb-4">FORMATO DE PERMISO PARA JUNTA DIRECTIVA</h1>
        <div className="mb-4">
            <h2 className="font-semibold mb-2 bg-green-200 p-2">DATOS DE DIRECTIVO SOLICITANTE</h2>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <label className="block text-sm font-medium">NOMBRES Y APELLIDO(S)</label>
                    <input type="text" value={request.nombres + ' ' + request.apellido} className="w-full border-2 border-gray-300 p-2" readOnly />
                </div>
                <div className="col-span-3">
                    <label className="block text-sm font-medium">CARGO</label>
                    <input type="text" value={request.cargo} className="w-full border-2 border-gray-300 p-2" readOnly />
                </div>
                <div className="col-span-3">
                    <label className="block text-sm font-medium">N° Identificación</label>
                    <input type="text" value={request.identificacion} className="w-full border-2 border-gray-300 p-2" readOnly />
                </div>
            </div>
        </div>
        <div className="mb-4">
            <h2 className="font-semibold mb-2 bg-green-200 p-2">DATOS DEL PERMISO SOLICITADO</h2>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <label className="block text-sm font-medium">PERMISO POR REUNIÓN</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">DESDE</label>
                            <input type="date" value={request.desdeReunion} className="w-full border-2 border-gray-300 p-2" readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">HASTA</label>
                            <input type="date" value={request.hastaReunion} className="w-full border-2 border-gray-300 p-2" readOnly />
                        </div>
                    </div>
                    <label className="block text-sm font-medium mt-2">TOTAL DÍAS</label>
                    <input type="text" value={request.totalDias} className="w-full border-2 border-gray-300 p-2" readOnly />
                </div>
                <div className="col-span-6">
                    <label className="block text-sm font-medium">PERMISO POR HORA</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">A PARTIR DE</label>
                            <input type="time" value={request.aPartirDe} className="w-full border-2 border-gray-300 p-2" readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">HASTA LAS</label>
                            <input type="time" value={request.hastaLas} className="w-full border-2 border-gray-300 p-2" readOnly />
                        </div>
                    </div>
                    <label className="block text-sm font-medium mt-2">TOTAL HORAS</label>
                    <input type="text" value={request.totalHoras} className="w-full border-2 border-gray-300 p-2" readOnly />
                </div>
            </div>
            <label className="block text-sm font-medium mt-4">MOTIVO DEL PERMISO:</label>
            <textarea
                value={request.motivo}
                className="w-full border-2 border-gray-300 p-2"
                readOnly
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium">SOPORTE LA JUSTIFICACIÓN ANEXADA</label>
            <input type="text" value={request.justificacion} className="w-full border-2 border-gray-300 p-2" readOnly />
        </div>
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium">FIRMA DE DIRECTIVO SOLICITANTE</label>
                <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                        <label className="block text-sm font-medium">FECHA DE SOLICITUD:</label>
                        <input type="text" value={new Date(request.timestamp.seconds * 1000).toLocaleDateString()} className="w-full border-2 border-gray-300 p-2" readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">NOMBRE:</label>
                        <input type="text" value={request.nombres} className="w-full border-2 border-gray-300 p-2" readOnly />
                    </div>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium">FIRMA DE RECIBIDO</label>
                <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                        <label className="block text-sm font-medium">FECHA DE RECIBIDO:</label>
                        <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">NOMBRE:</label>
                        <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
                    </div>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium">FIRMA DE APROBADO</label>
                <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                        <label className="block text-sm font-medium">FECHA DE APROBADO:</label>
                        <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">NOMBRE:</label>
                        <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Print: React.FC = () => {
    const [requests, setRequests] = useState<FormSubmission[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<FormSubmission | null>(null);
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

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

    const selectRequest = (request: FormSubmission) => {
        setSelectedRequest(request);
        handlePrint();
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
                            onClick={() => selectRequest(request)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-200 w-full"
                        >
                            Imprimir
                        </button>
                    </li>
                ))}
            </ul>

            <div style={{ display: 'none' }}>
                <div ref={printRef}>
                    {selectedRequest && <PermitForm request={selectedRequest} />}
                </div>
            </div>
        </div>
    );
};

export default Print;
