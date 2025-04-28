import { Request, Response } from "express";
import pool from "../config/database";
import { IPaymentMethod } from "../models/paymentMethod";

export class PaymentMethodController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM metodopago");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching PaymentMethod",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM metodopago WHERE id_metodo_pago = ?",
        [req.params.id]
      );
      const tax = rows as IPaymentMethod[];

      if (tax.length === 0) {
        return res.status(404).json({ message: "PaymentMethod not found" });
      }
      res.json(tax[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching PaymentMethod",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { nombre, activo } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO metodopago (nombre, activo) VALUES (?,?)",
        [nombre, activo]
      );

      res.status(201).json({
        message: "PaymentMethod created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating PaymentMethod",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { nombre, activo } = req.body;

      const [result] = await pool.execute(
        "UPDATE metodopago SET nombre = ?, activo = ? WHERE id_metodo_pago = ?",
        [nombre, activo, req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "PaymentMethod not found" });
      }

      res.json({ message: "PaymentMethod updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating PaymentMethod",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM metodopago WHERE id_metodo_pago = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "PaymentMethod not found" });
      }

      res.json({ message: "PaymentMethod deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting PaymentMethod",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
