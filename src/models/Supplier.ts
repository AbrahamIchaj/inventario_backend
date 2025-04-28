import { RowDataPacket } from "mysql2";

export interface ISupplier extends RowDataPacket {
  id_proveedor: number;
  nombre: string;
  telefono: number;
  email: string;
  direccion: string;
  ciudad: string;
  contactoReferencia: number;
  rfc: string;
}
