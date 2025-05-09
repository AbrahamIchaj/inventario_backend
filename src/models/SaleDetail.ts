import { RowDataPacket } from "mysql2";

export interface ISaleDetail extends RowDataPacket {
  id_detalle: number;
  venta_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  descuento_unitario: number;
  subtotal: number;
}