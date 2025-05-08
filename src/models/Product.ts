import { RowDataPacket } from "mysql2";

export interface IProduct extends RowDataPacket {
  id_producto: number;
  codigo_barra: string;
  nombre: string;
  descripcion: string;
  categoria_id: number;
  marca_id: number;
  precio_compra: number;
  precio_venta: number;
  precio_mayoreo: number;
  impuesto_id: number;
  stock_actual: number;
  stock_minimo: number;
  unidad_medida: string;
  fecha_caducidad: Date | null;
  imagen_url: string;
  activo: boolean;
  codigo_interno: string;
}
