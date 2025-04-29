import { RowDataPacket } from "mysql2";

export interface IUser extends RowDataPacket {
  id_usuario: number;
  nombre: string;
  email: string;
  password_hash: string;
  rol_id: number;
  activo: boolean;
  ultimo_acceso: Date;
}
