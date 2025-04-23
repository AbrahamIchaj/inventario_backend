import { Request, Response } from "express";
import pool from "../config/database";
import { IRole } from "../models/Role";

export class RoleController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM rol");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching roles",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM rol WHERE id_rol = ?", [
        req.params.id,
      ]);
      const roles = rows as IRole[];

      if (roles.length === 0) {
        return res.status(404).json({ message: "Role not found" });
      }
      res.json(roles[0]);
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
      const { nombre, permisos } = req.body;

      if (permisos) {
        JSON.parse(permisos);
      }

      const [result] = await pool.execute(
        "INSERT INTO rol (nombre, permisos) VALUES (?, ?)",
        [nombre, permisos]
      );

      res.status(201).json({
        message: "Role created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating role",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { nombre, permisos } = req.body;
      if (permisos) {
        JSON.parse(permisos);
      }

      const [result] = await pool.execute(
        "UPDATE rol SET nombre = ?, permisos = ? WHERE id_rol = ?",
        [nombre, permisos, req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Role not found" });
      }

      res.json({ message: "Role updated successfully" });
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
      const [result] = await pool.execute("DELETE FROM rol WHERE id_rol = ?", [
        req.params.id,
      ]);

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Role not found" });
      }

      res.json({ message: "Role deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting role",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
