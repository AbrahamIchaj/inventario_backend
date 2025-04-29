import { Request, Response } from "express";
import pool from "../config/database";
import { IBranch } from "../models/Branch";

export class BranchController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM sucursal");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Branches",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM sucursal WHERE id_sucursal = ?",
        [req.params.id]
      );
      const branches = rows as IBranch[];

      if (branches.length === 0) {
        return res.status(404).json({ message: "Branch not found" });
      }
      res.json(branches[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Branch",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { nombre, direccion, telefono, responsable_id } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO sucursal (nombre, direccion, telefono, responsable_id) VALUES (?, ?, ?, ?)",
        [nombre, direccion, telefono, responsable_id]
      );

      res.status(201).json({
        message: "Branch created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Branch",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { nombre, direccion, telefono, responsable_id } = req.body;

      // Check user exists
      if (responsable_id) {
        const [userRows] = await pool.execute(
          "SELECT id_usuario FROM usuario WHERE id_usuario = ?",
          [responsable_id]
        );

        if ((userRows as any[]).length === 0) {
          return res.status(400).json({
            message: "Referenced user does not exist",
            error: `User with id ${responsable_id} not found`,
          });
        }
      }

      const [result] = await pool.execute(
        "UPDATE sucursal SET nombre = ?, direccion = ?, telefono = ?, responsable_id = ? WHERE id_sucursal = ?",
        [nombre, direccion, telefono, responsable_id, req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Branch not found" });
      }

      res.json({ message: "Branch updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Branch",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM sucursal WHERE id_sucursal = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Branch not found" });
      }

      res.json({ message: "Branch deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Branch",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
