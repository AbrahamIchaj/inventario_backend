import { Request, Response } from "express";
import pool from "../config/database";
import { IBuy } from "../models/Buy";

export class BuyController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM compra");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Buy",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM compra WHERE id_compra = ?",
        [req.params.id]
      );
      const buy = rows as IBuy[];

      if (buy.length === 0) {
        return res.status(404).json({ message: "Buy not found" });
      }
      res.json(buy[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Buy",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { fecha, proveedor_id, usuario_id, estado, total, observaciones } =
        req.body;

      const [result] = await pool.execute(
        "INSERT INTO compra (fecha, proveedor_id, usuario_id, estado,  total, observaciones) VALUES (?,?,?,?,?,?)",
        [fecha, proveedor_id, usuario_id, estado, total, observaciones]
      );

      res.status(201).json({
        message: "Buy created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Buy",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { fecha, proveedor_id, usuario_id, estado, total, observaciones } =
        req.body;

      const [result] = await pool.execute(
        "UPDATE compra SET fecha=?, proveedor_id=?, usuario_id=?, estado=?, total=?, observaciones=? WHERE id_compra=?",
        [
          fecha,
          proveedor_id,
          usuario_id,
          estado,
          total,
          observaciones,
          req.params.id,
        ]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Buy not found" });
      }

      res.json({ message: "Buy updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Buy",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM compra WHERE id_compra = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Buy not found" });
      }

      res.json({ message: "Buy deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Buy",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
