import { Request, Response } from "express";
import pool from "../config/database";
import { ISale } from "../models/Sale";

export class SaleController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM venta");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Sales",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM venta WHERE id_venta = ?",
        [req.params.id]
      );
      const sale = rows as ISale[];

      if (sale.length === 0) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.json(sale[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Sale",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        usuario_id,
        cliente_id,
        subtotal,
        descuento_total,
        impuesto_total,
        total,
        metodo_pago_id,
        comentarios,
        caja_id,
        sucursal_id,
      } = req.body;

      const [result] = await pool.execute(
        `INSERT INTO venta (
          usuario_id, cliente_id, subtotal, descuento_total,
          impuesto_total, total, metodo_pago_id, estado,
          comentarios, caja_id, sucursal_id
        ) VALUES (?,?,?,?,?,?,?,'pendiente',?,?,?)`,
        [
          usuario_id,
          cliente_id,
          subtotal,
          descuento_total,
          impuesto_total,
          total,
          metodo_pago_id,
          comentarios,
          caja_id,
          sucursal_id,
        ]
      );

      res.status(201).json({
        message: "Sale created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Sale",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        usuario_id,
        cliente_id,
        subtotal,
        descuento_total,
        impuesto_total,
        total,
        metodo_pago_id,
        estado,
        comentarios,
        caja_id,
        sucursal_id,
      } = req.body;

      const [result] = await pool.execute(
        `UPDATE venta SET 
          usuario_id=?, cliente_id=?, subtotal=?, descuento_total=?,
          impuesto_total=?, total=?, metodo_pago_id=?, estado=?,
          comentarios=?, caja_id=?, sucursal_id=?
        WHERE id_venta=?`,
        [
          usuario_id,
          cliente_id,
          subtotal,
          descuento_total,
          impuesto_total,
          total,
          metodo_pago_id,
          estado,
          comentarios,
          caja_id,
          sucursal_id,
          req.params.id,
        ]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Sale not found" });
      }

      res.json({ message: "Sale updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Sale",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "UPDATE venta SET estado = 'cancelada' WHERE id_venta = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Sale not found" });
      }

      res.json({ message: "Sale cancelled successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error cancelling Sale",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM venta WHERE id_venta = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Sale not found" });
      }

      res.json({ message: "Sale deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Sale",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
