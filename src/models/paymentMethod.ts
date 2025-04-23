import { RowDataPacket } from 'mysql2';

export interface IPaymentMethod extends RowDataPacket {
  id_metodo_pago: number;
  nombre: string;
  activo: number;
}