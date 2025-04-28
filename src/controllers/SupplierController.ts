import { Request, Response } from "express";
import pool from "../config/database";
import { ISupplier } from "../models/Supplier";

export class SupplierController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM proveedor");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Supplier",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM proveedor WHERE id_proveedor = ?",
        [req.params.id]
      );
      const supplier = rows as ISupplier[];

      if (supplier.length === 0) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      res.json(supplier[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Supplier",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        nombre,
        telefono,
        email,
        direccion,
        ciudad,
        contactoReferencia,
        rfc,
      } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO proveedor ( nombre, telefono, email, direccion, ciudad, contacto_referencia, rfc ) VALUES ( ?,?,?,?,?,?,? )",
        [nombre, telefono, email, direccion, ciudad, contactoReferencia, rfc]
      );

      res.status(201).json({
        message: "Supplier created successfully",
        result,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Supplier",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        nombre,
        telefono,
        email,
        direccion,
        ciudad,
        contactoReferencia,
        rfc,
      } = req.body;

      const [result] = await pool.execute(
        "UPDATE proveedor SET nombre = ?, telefono = ?, email = ?, direccion = ?, ciudad = ?, contacto_referencia = ?, rfc = ? WHERE id_proveedor = ?",
        [
          nombre,
          telefono,
          email,
          direccion,
          ciudad,
          contactoReferencia,
          rfc,
          req.params.id,
        ]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Supplier not found" });
      }

      res.json({ message: "Supplier updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Supplier",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "DELETE FROM proveedor WHERE id_proveedor = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Supplier not found" });
      }

      res.json({ message: "Supplier deleted" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Supplier",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
