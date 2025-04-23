import { Request, Response } from "express";
import pool from "../config/database";
import { ITax } from "../models/Tax";

export class TaxController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM impuesto");
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
      const [rows] = await pool.execute("SELECT * FROM impuesto WHERE id_impuesto = ?", [
        req.params.id,
      ]);
      const tax = rows as ITax[];

      if (tax.length === 0) {
        return res.status(404).json({ message: "Tax not found" });
      }
      res.json(tax[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching tax",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { nombre, porcentaje, descripcion  } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO impuesto (nombre, porcentaje, descripcion) VALUES (?,?,?)",
        [nombre, porcentaje, descripcion]
      );

      res.status(201).json({
        message: "Tax created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Tax",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { nombre, porcentaje, descripcion } = req.body;
      
      const [result] = await pool.execute(
        "UPDATE impuesto SET nombre = ?, porcentaje = ?, descripcion = ? WHERE id_impuesto = ?",
        [nombre, porcentaje, descripcion, req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Tax not found" });
      }

      res.json({ message: "Tax updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Tax",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute("DELETE FROM impuesto WHERE id_impuesto = ?", [
        req.params.id,
      ]);

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Tax not found" });
      }

      res.json({ message: "Tax deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Tax",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
