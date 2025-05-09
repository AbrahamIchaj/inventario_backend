import { Request, Response } from "express";
import pool from "../config/database";
import { ISaleDetail } from "../models/SaleDetail";

export class SaleDetailController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM detalleventa");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Sale Details",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM detalleventa WHERE id_detalle = ?",
        [req.params.id]
      );
      const saleDetail = rows as ISaleDetail[];

      if (saleDetail.length === 0) {
        return res.status(404).json({ message: "Sale Detail not found" });
      }
      res.json(saleDetail[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Sale Detail",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getBySaleId(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM detalleventa WHERE venta_id = ?",
        [req.params.saleId]
      );
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Sale Details",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        venta_id,
        producto_id,
        cantidad,
        precio_unitario,
        descuento_unitario
      } = req.body;

      // Calcular subtotal
      const subtotal = (cantidad * precio_unitario) - (descuento_unitario * cantidad);

      const [result] = await pool.execute(
        `INSERT INTO detalleventa (
          venta_id, producto_id, cantidad, precio_unitario,
          descuento_unitario, subtotal
        ) VALUES (?,?,?,?,?,?)`,
        [
          venta_id,
          producto_id,
          cantidad,
          precio_unitario,
          descuento_unitario,
          subtotal
        ]
      );

      res.status(201).json({
        message: "Sale Detail created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Sale Detail",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        venta_id,
        producto_id,
        cantidad,
        precio_unitario,
        descuento_unitario
      } = req.body;

      // Calcular subtotal
      const subtotal = (cantidad * precio_unitario) - (descuento_unitario * cantidad);

      const [result] = await pool.execute(
        `UPDATE detalleventa SET 
          venta_id=?, producto_id=?, cantidad=?,
          precio_unitario=?, descuento_unitario=?, subtotal=?
        WHERE id_detalle=?`,
        [
          venta_id,
          producto_id,
          cantidad,
          precio_unitario,
          descuento_unitario,
          subtotal,
          req.params.id,
        ]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Sale Detail not found" });
      }

      res.json({ message: "Sale Detail updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Sale Detail",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM detalleventa WHERE id_detalle = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Sale Detail not found" });
      }

      res.json({ message: "Sale Detail deleted successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Sale Detail",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}