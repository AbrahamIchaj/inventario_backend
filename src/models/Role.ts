import { RowDataPacket } from 'mysql2';

export interface IRole extends RowDataPacket {
  id_rol: number;
  nombre: string;
  permisos: string;
}