import { RowDataPacket } from 'mysql2';

export interface ITax extends RowDataPacket {
  id_impuesto: number;
  nombre: string;
  porcentaje: number;
  descripcion: string;
}