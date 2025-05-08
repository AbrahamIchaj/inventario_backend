import { Request, Response } from "express";
import pool from "../config/database";
import { IBox } from "../models/Box";

export class BoxController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM caja");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Tax",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM caja WHERE id_caja = ?",
        [req.params.id]
      );
      const box = rows as IBox[];

      if (box.length === 0) {
        return res.status(404).json({ message: "Box not found" });
      }
      res.json(box[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching box",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        sucursal_id,
        nombre,
        estado,
        saldo_inicial,
        saldo_final,
        usuario_apertura,
        usuario_cierre,
        fecha_apertura,
        fecha_cierre,
      } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO caja (sucursal_id, nombre, estado, saldo_inicial, saldo_final,  usuario_apertura, usuario_cierre, fecha_apertura, fecha_cierre) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          sucursal_id,
          nombre,
          estado,
          saldo_inicial,
          saldo_final,
          usuario_apertura,
          usuario_cierre,
          fecha_apertura,
          fecha_cierre,
        ]
      );

      res.status(201).json({
        message: "Box created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Box",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        sucursal_id,
        nombre,
        estado,
        saldo_inicial,
        saldo_final,
        usuario_apertura,
        usuario_cierre,
        fecha_apertura,
        fecha_cierre,
      } = req.body;

      const [result] = await pool.execute(
        "UPDATE impuesto SET sucursal_id=?, nombre=?, estado=?, saldo_inicial=?, saldo_final=?,  usuario_apertura=?, usuario_cierre=?, fecha_apertura=?, fecha_cierre=? where id_caja=?",
        [
          sucursal_id,
          nombre,
          estado,
          saldo_inicial,
          saldo_final,
          usuario_apertura,
          usuario_cierre,
          fecha_apertura,
          fecha_cierre,
          req.params.id,
        ]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Box not found" });
      }

      res.json({ message: "Box updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Box",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM caja WHERE id_caja = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Caja not found" });
      }

      res.json({ message: "Caja deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Caja",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
