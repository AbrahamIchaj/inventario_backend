import { Request, Response } from "express";
import pool from "../config/database";
import { ICategory } from "../models/Category";

export class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM categoria");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching categories",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM categoria WHERE id_categoria = ?", [
        req.params.id,
      ]);
      const category = rows as ICategory[];

      if (category.length === 0) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching role",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { nombre, descripcion } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)",
        [nombre, descripcion]
      );

      res.status(201).json({
        message: "Category created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating category",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { nombre, descripcion } = req.body;
      
      const [result] = await pool.execute(
        "UPDATE categoria SET nombre = ?, descripcion = ? WHERE id_categoria = ?",
        [nombre, descripcion, req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json({ message: "Category updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating role",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute("DELETE FROM categoria WHERE id_categoria = ?", [
        req.params.id,
      ]);

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json({ message: "Category deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Category",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }


}