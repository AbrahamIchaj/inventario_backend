import { RowDataPacket } from 'mysql2';

export interface ICategory extends RowDataPacket {
  id_categoria: number;
  nombre: string;
  descripcion: string;
}