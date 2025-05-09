import { RowDataPacket } from "mysql2";

export interface IPurchaseDetail extends RowDataPacket {
  id_detalle_compra: number;
  compra_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
}