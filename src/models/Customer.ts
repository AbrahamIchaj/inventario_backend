import { RowDataPacket } from 'mysql2';

export interface ICustomer extends RowDataPacket {
  id_cliente: number;
  nombre: string;
  apellido: string;
  telefono: number;
  email: string;
  direccion: string;
  ciudad: string;
  fechaRegistro: Date;
  saldoPendiente: number;
  limiteCredito: number;
  activo: number;
}