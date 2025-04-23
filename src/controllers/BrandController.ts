import { Request, Response } from "express";
import pool from "../config/database";
import { IBrand } from "../models/Brand";

export class BrandController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM marca");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Brand",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM marca WHERE id_marca = ?", [
        req.params.id,
      ]);
      const brand = rows as IBrand[];

      if (brand.length === 0) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.json(brand[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Brand",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { nombre, descripcion  } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO marca (nombre, descripcion) VALUES (?,?)",
        [nombre, descripcion]
      );

      res.status(201).json({
        message: "Brand created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Brand",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { nombre, descripcion } = req.body;
      
      const [result] = await pool.execute(
        "UPDATE marca SET nombre = ?, descripcion = ? WHERE id_marca = ?",
        [nombre, descripcion, req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Brand not found" });
      }

      res.json({ message: "Brand updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Brand",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute("DELETE FROM marca WHERE id_marca = ?", [
        req.params.id,
      ]);

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Brand not found" });
      }

      res.json({ message: "Brand deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Brand",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
