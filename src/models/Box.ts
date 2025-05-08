import { RowDataPacket } from "mysql2";

export interface IBox extends RowDataPacket {
  id_caja: number;
  sucursal_id: number;
  nombre: string;
  estado: boolean;
  saldo_inicial: number;
  saldo_final: number;
  usuario_apertura: number;
  usuario_cierre: number;
  fecha_apertura: Date;
  fecha_cierre: Date;
}
