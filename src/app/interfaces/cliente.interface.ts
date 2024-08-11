export interface Cliente extends ClienteForm {
    id: string;
  }
  
  export interface ClienteForm {
    nombreCompleto: string;
    correo: string;
    telefono: string;
    direccion?: string;
  }
  