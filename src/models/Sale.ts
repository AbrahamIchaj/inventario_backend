import { RowDataPacket } from "mysql2";

export interface ISale extends RowDataPacket {
  id_venta: number;
  fecha_hora: Date;
  usuario_id: number;
  cliente_id: number;
  subtotal: number;
  descuento_total: number;
  impuesto_total: number;
  total: number;
  metodo_pago_id: number;
  estado: "pagada" | "pendiente" | "cancelada";
  comentarios: string | null;
  caja_id: number;
  sucursal_id: number;
}
