import { Request, Response } from "express";
import pool from "../config/database";
import { IProduct } from "../models/Product";
import { BarcodeGenerator } from "../utils/barcodeGenerator";

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute("SELECT * FROM producto");
      res.json(rows);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Products",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const [rows] = await pool.execute(
        "SELECT * FROM producto WHERE id_producto = ?",
        [req.params.id]
      );
      const product = rows as IProduct[];

      if (product.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product[0]);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error fetching Product",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const {
        codigo_barra,
        barcodePattern, // New field for custom pattern
        nombre,
        descripcion,
        categoria_id,
        marca_id,
        precio_compra,
        precio_venta,
        precio_mayoreo,
        impuesto_id,
        stock_actual,
        stock_minimo,
        unidad_medida,
        fecha_caducidad,
        imagen_url,
        codigo_interno,
      } = req.body;

      // Generate barcode if not provided
      let finalBarcode = codigo_barra;
      if (!finalBarcode) {
        if (
          barcodePattern &&
          !BarcodeGenerator.validatePattern(barcodePattern)
        ) {
          return res.status(400).json({
            message:
              "Invalid barcode pattern. Use only 'A' for letters and 'N' for numbers",
          });
        }
        finalBarcode = await BarcodeGenerator.generateBarcode(barcodePattern);
      }

      // Check if barcode already exists
      const [existing] = await pool.execute(
        "SELECT id_producto FROM producto WHERE codigo_barra = ?",
        [finalBarcode]
      );

      if ((existing as any[]).length > 0) {
        return res.status(400).json({
          message: "Barcode already exists",
        });
      }

      const [result] = await pool.execute(
        `INSERT INTO producto (
          codigo_barra, nombre, descripcion, categoria_id, marca_id,
          precio_compra, precio_venta, precio_mayoreo, impuesto_id,
          stock_actual, stock_minimo, unidad_medida, fecha_caducidad,
          imagen_url, activo, codigo_interno
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,?)`,
        [
          finalBarcode,
          nombre,
          descripcion,
          categoria_id,
          marca_id,
          precio_compra,
          precio_venta,
          precio_mayoreo,
          impuesto_id,
          stock_actual,
          stock_minimo,
          unidad_medida,
          fecha_caducidad,
          imagen_url,
          codigo_interno,
        ]
      );

      res.status(201).json({
        message: "Product created successfully",
        result,
        barcode: finalBarcode,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error creating Product",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        codigo_barra,
        nombre,
        descripcion,
        categoria_id,
        marca_id,
        precio_compra,
        precio_venta,
        precio_mayoreo,
        impuesto_id,
        stock_actual,
        stock_minimo,
        unidad_medida,
        fecha_caducidad,
        imagen_url,
        codigo_interno,
      } = req.body;

      const [result] = await pool.execute(
        `UPDATE producto SET 
          codigo_barra=?, nombre=?, descripcion=?, categoria_id=?, marca_id=?,
          precio_compra=?, precio_venta=?, precio_mayoreo=?, impuesto_id=?,
          stock_actual=?, stock_minimo=?, unidad_medida=?, fecha_caducidad=?,
          imagen_url=?, codigo_interno=?
        WHERE id_producto=?`,
        [
          codigo_barra,
          nombre,
          descripcion,
          categoria_id,
          marca_id,
          precio_compra,
          precio_venta,
          precio_mayoreo,
          impuesto_id,
          stock_actual,
          stock_minimo,
          unidad_medida,
          fecha_caducidad,
          imagen_url,
          codigo_interno,
          req.params.id,
        ]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error updating Product",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const [result] = await pool.execute(
        "UPDATE producto WHERE id_producto = ?",
        [req.params.id]
      );

      const resultAsAny = result as any;
      if (resultAsAny.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        message: "Error deleting Product",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
