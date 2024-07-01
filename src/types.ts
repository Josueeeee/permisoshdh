// types.ts
export interface FormSubmission {
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
    userId: string;
    email: string;
    timestamp: any;
  }
  