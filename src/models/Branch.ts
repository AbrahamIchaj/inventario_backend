import { RowDataPacket } from "mysql2";

export interface IBranch extends RowDataPacket {
  id_sucursal: number;
  nombre: string;
  direccion: string;
  telefono: string;
  responsable_id: number;
}
