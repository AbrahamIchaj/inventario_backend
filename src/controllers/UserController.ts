import { Request, Response } from "express";
import pool from "../config/database";
import { IUser } from "../models/User";
import * as bcrypt from "bcrypt";
const saltRounds = 10;

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM usuario");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Users",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM usuario WHERE id_usuario = ?",
        [req.params.id]
      );
      const users = rows as IUser[];

      if (users.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(users[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching User",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { nombre, email, password, rol_id, activo } = req.body;

      // ---- Validate required fields
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      // ---- Hash the password
      const password_hash = await bcrypt.hash(password, saltRounds);

      const [result] = await pool.execute(
        "INSERT INTO usuario (nombre, email, password_hash, rol_id, activo) VALUES (?, ?, ?, ?, ?)",
        [nombre, email, password_hash, rol_id, activo]
      );

      res.status(201).json({
        message: "User created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating User",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { nombre, email, password, rol_id, activo } = req.body;

      let password_hash;
      if (password) {
        // Only hash if password is being updated
        password_hash = await bcrypt.hash(password, saltRounds);
      } else {
        // Keep existing password if not being updated
        const [users] = await pool.execute(
          "SELECT password_hash FROM usuario WHERE id_usuario = ?",
          [req.params.id]
        );
        password_hash = (users as IUser[])[0].password_hash;
      }

      const [result] = await pool.execute(
        "UPDATE usuario SET nombre = ?, email = ?, password_hash = ?, rol_id = ?, activo = ? WHERE id_usuario = ?",
        [nombre, email, password_hash, rol_id, activo, req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating User",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM usuario WHERE id_usuario = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting User",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
