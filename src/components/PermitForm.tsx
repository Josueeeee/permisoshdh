

const PermitForm = () => {
  return (
    <div className="p-4 border-2 border-gray-300">
      <h1 className="text-center text-xl font-bold mb-4">FORMATO DE PERMISO PARA JUNTA DIRECTIVA</h1>
      <div className="mb-4">
        <h2 className="font-semibold mb-2 bg-green-200 p-2">DATOS DE DIRECTIVO SOLICITANTE</h2>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <label className="block text-sm font-medium">NOMBRES Y APELLIDO(S)</label>
            <input type="text" value="José Manuel Arita" className="w-full border-2 border-gray-300 p-2" readOnly />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium">CARGO</label>
            <input type="text" value="PRESIDENTE" className="w-full border-2 border-gray-300 p-2" readOnly />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium">N° Identificación</label>
            <input type="text" value="1413195800151" className="w-full border-2 border-gray-300 p-2" readOnly />
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
                <input type="date" value="2024-07-05" className="w-full border-2 border-gray-300 p-2" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium">HASTA</label>
                <input type="date" value="2024-07-05" className="w-full border-2 border-gray-300 p-2" readOnly />
              </div>
            </div>
            <label className="block text-sm font-medium mt-2">TOTAL DÍAS</label>
            <input type="text" value="1" className="w-full border-2 border-gray-300 p-2" readOnly />
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium">PERMISO POR HORA</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">A PARTIR DE</label>
                <input type="time" className="w-full border-2 border-gray-300 p-2" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium">HASTA LAS</label>
                <input type="time" className="w-full border-2 border-gray-300 p-2" readOnly />
              </div>
            </div>
            <label className="block text-sm font-medium mt-2">TOTAL HORAS</label>
            <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
          </div>
        </div>
        <label className="block text-sm font-medium mt-4">MOTIVO DEL PERMISO:</label>
        <textarea
          value="La OPDF me asigno acompañar al equipo que viajará a Siguatepeque para ver 3 terrenos que nos ofrecen, para construcciones de esta institución"
          className="w-full border-2 border-gray-300 p-2"
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">SOPORTE LA JUSTIFICACIÓN ANEXADA</label>
        <input type="text" value="DOCUMENTO DE CITA MÉDICA U OTROS" className="w-full border-2 border-gray-300 p-2" readOnly />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">FIRMA DE DIRECTIVO SOLICITANTE</label>
          <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium">FECHA DE SOLICITUD:</label>
              <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium">NOMBRE:</label>
              <input type="text" className="w-full border-2 border-gray-300 p-2" readOnly />
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
};

export default PermitForm;
