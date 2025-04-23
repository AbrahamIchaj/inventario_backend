import { RowDataPacket } from 'mysql2';

export interface IBrand extends RowDataPacket {
  id_marca: number;
  nombre: string;
  descripcion: string;
}