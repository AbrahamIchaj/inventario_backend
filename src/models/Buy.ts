import { RowDataPacket } from "mysql2";

export interface IBuy extends RowDataPacket {
  id_compra: number;
  fecha: Date;
  proveedor_id: number;
  usuario_id: number;
  estado: string;
  total: number;
  observaciones: string | null;
}
