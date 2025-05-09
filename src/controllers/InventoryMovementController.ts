import { Request, Response } from "express";
import pool from "../config/database";
import { IInventoryMovement } from "../models/InventoryMovement";

export class InventoryMovementController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM movimientoinventario");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Inventory Movements",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM movimientoinventario WHERE id_movimiento = ?",
        [req.params.id]
      );
      const movement = rows as IInventoryMovement[];

      if (movement.length === 0) {
        return res.status(404).json({ message: "Inventory Movement not found" });
      }
      res.json(movement[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Inventory Movement",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        producto_id,
        tipo,
        cantidad,
        usuario_id,
        referencia,
        comentarios
      } = req.body;

      const [result] = await pool.execute(
        `INSERT INTO movimientoinventario (
          producto_id, tipo, cantidad, usuario_id, referencia, comentarios
        ) VALUES (?,?,?,?,?,?)`,
        [producto_id, tipo, cantidad, usuario_id, referencia, comentarios]
      );

      // Actualizar el stock del producto
      if (tipo === 'entrada' || tipo === 'ajuste') {
        await pool.execute(
          "UPDATE producto SET stock_actual = stock_actual + ? WHERE id_producto = ?",
          [cantidad, producto_id]
        );
      } else if (tipo === 'salida') {
        await pool.execute(
          "UPDATE producto SET stock_actual = stock_actual - ? WHERE id_producto = ?",
          [cantidad, producto_id]
        );
      }

      res.status(201).json({
        message: "Inventory Movement created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Inventory Movement",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        producto_id,
        tipo,
        cantidad,
        usuario_id,
        referencia,
        comentarios
      } = req.body;

      const [result] = await pool.execute(
        `UPDATE movimientoinventario SET 
          producto_id=?, tipo=?, cantidad=?, usuario_id=?, 
          referencia=?, comentarios=?
        WHERE id_movimiento=?`,
        [
          producto_id,
          tipo,
          cantidad,
          usuario_id,
          referencia,
          comentarios,
          req.params.id,
        ]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Inventory Movement not found" });
      }

      res.json({ message: "Inventory Movement updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Inventory Movement",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM movimientoinventario WHERE id_movimiento = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Inventory Movement not found" });
      }

      res.json({ message: "Inventory Movement deleted successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Inventory Movement",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}