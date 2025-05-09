import { Request, Response } from "express";
import pool from "../config/database";
import { IPurchaseDetail } from "../models/PurchaseDetail";

export class PurchaseDetailController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM detallecompra");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Purchase Details",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM detallecompra WHERE id_detalle_compra = ?",
        [req.params.id]
      );
      const purchaseDetail = rows as IPurchaseDetail[];

      if (purchaseDetail.length === 0) {
        return res.status(404).json({ message: "Purchase Detail not found" });
      }
      res.json(purchaseDetail[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Purchase Detail",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getByPurchaseId(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM detallecompra WHERE compra_id = ?",
        [req.params.purchaseId]
      );
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Purchase Details",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { compra_id, producto_id, cantidad, precio_unitario } = req.body;

      const [result] = await pool.execute(
        `INSERT INTO detallecompra (
          compra_id, producto_id, cantidad, precio_unitario
        ) VALUES (?,?,?,?)`,
        [compra_id, producto_id, cantidad, precio_unitario]
      );

      // Update purchase total
      await this.updatePurchaseTotal(compra_id);

      res.status(201).json({
        message: "Purchase Detail created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Purchase Detail",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { compra_id, producto_id, cantidad, precio_unitario } = req.body;

      const [result] = await pool.execute(
        `UPDATE detallecompra SET 
          compra_id=?, producto_id=?, cantidad=?, precio_unitario=?
        WHERE id_detalle_compra=?`,
        [compra_id, producto_id, cantidad, precio_unitario, req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Purchase Detail not found" });
      }

      // Update purchase total
      await this.updatePurchaseTotal(compra_id);

      res.json({ message: "Purchase Detail updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Purchase Detail",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [detail] = await pool.execute(
        "SELECT compra_id FROM detallecompra WHERE id_detalle_compra = ?",
        [req.params.id]
      );
      const purchaseDetail = (detail as IPurchaseDetail[])[0];

      const [result] = await pool.execute(
        "DELETE FROM detallecompra WHERE id_detalle_compra = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Purchase Detail not found" });
      }

      if (purchaseDetail) {
        await this.updatePurchaseTotal(purchaseDetail.compra_id);
      }

      res.json({ message: "Purchase Detail deleted successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Purchase Detail",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  private async updatePurchaseTotal(compraId: number) {
    try {
      await pool.execute(
        `UPDATE compra c 
         SET total = (
           SELECT SUM(cantidad * precio_unitario) 
           FROM detallecompra 
           WHERE compra_id = ?
         )
         WHERE id_compra = ?`,
        [compraId, compraId]
      );
    } catch (error) {
      console.error("Error updating purchase total:", error);
      throw error;
    }
  }
}
