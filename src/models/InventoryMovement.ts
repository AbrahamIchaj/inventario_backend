import { RowDataPacket } from "mysql2";

export interface IInventoryMovement extends RowDataPacket {
  id_movimiento: number;
  producto_id: number;
  fecha_hora: Date;
  tipo: 'entrada' | 'salida' | 'ajuste' | 'traslado';
  cantidad: number;
  usuario_id: number;
  referencia: string | null;
  comentarios: string | null;
}