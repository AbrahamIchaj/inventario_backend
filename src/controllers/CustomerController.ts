import { Request, Response } from "express";
import pool from "../config/database";
import { ICustomer } from "../models/Customer";

export class CustomerController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM cliente");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Customer",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM cliente WHERE id_cliente = ?",
        [req.params.id]
      );
      const customer = rows as ICustomer[];

      if (customer.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(customer[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Customer",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        nombre,
        apellido,
        telefono,
        email,
        direccion,
        ciudad,
        fechaRegistro,
        saldoPendiente,
        limiteCredito,
        activo,
      } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO cliente (nombre, apellido, telefono, email, direccion, ciudad, fecha_registro, saldo_pendiente, limite_credito, activo) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          nombre,
          apellido,
          telefono,
          email,
          direccion,
          ciudad,
          fechaRegistro,
          saldoPendiente,
          limiteCredito,
          activo,
        ]
      );

      res.status(201).json({
        message: "Customer created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Customer",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        nombre,
        apellido,
        telefono,
        email,
        direccion,
        ciudad,
        fechaRegistro,
        saldoPendiente,
        limiteCredito,
        activo,
      } = req.body;

      const [result] = await pool.execute(
        "UPDATE cliente SET nombre = ?, apellido = ?, telefono = ?, email =?, direccion=?, ciudad=?, fecha_registro=?, saldo_pendiente=?, limite_credito=?, activo=? WHERE id_cliente = ?",
        [
          nombre,
          apellido,
          telefono,
          email,
          direccion,
          ciudad,
          fechaRegistro,
          saldoPendiente,
          limiteCredito,
          activo,
          req.params.id,
        ]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json({ message: "Customer updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Customer",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM cliente WHERE id_cliente = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json({ message: "Customer deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Customer",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
