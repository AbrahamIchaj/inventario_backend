import pool from "../config/database";

export class BarcodeGenerator {
  private static defaultPattern = "PROD-NNNNN";

  static async getLastCounter(
    pattern: string = BarcodeGenerator.defaultPattern
  ): Promise<number> {
    try {
      const prefix = pattern.split("N")[0];

      const [rows] = await pool.execute(
        "SELECT codigo_barra FROM producto WHERE codigo_barra LIKE ? ORDER BY CAST(REPLACE(codigo_barra, ?, '') AS SIGNED) DESC LIMIT 1",
        [`${prefix}%`, prefix]
      );

      const products = rows as Array<{ codigo_barra: string }>;

      if (products.length === 0) {
        return 0;
      }

      const lastBarcode = products[0].codigo_barra;
      const numberPart = lastBarcode.substring(prefix.length);
      return parseInt(numberPart) || 0;
    } catch (error) {
      console.error("Error getting last counter:", error);
      return 0;
    }
  }

  private static padNumber(num: number, length: number): string {
    return num.toString().padStart(length, "0");
  }

  static async generateBarcode(
    pattern: string = BarcodeGenerator.defaultPattern
  ): Promise<string> {
    try {
      const prefix = pattern.split("N")[0];
      const numberCount = (pattern.match(/N/g) || []).length;

      const lastNumber = await this.getLastCounter(pattern);
      const nextNumber = lastNumber + 1;

      if (nextNumber >= Math.pow(10, numberCount)) {
        throw new Error(
          `Sequence overflow. Maximum number for pattern ${pattern} is ${
            Math.pow(10, numberCount) - 1
          }`
        );
      }

      const paddedNumber = this.padNumber(nextNumber, numberCount);
      return `${prefix}${paddedNumber}`;
    } catch (error) {
      console.error("Error generating barcode:", error);
      throw error;
    }
  }

  static validatePattern(pattern: string): boolean {
    return pattern.includes("N") && /^[A-Z0-9N-]+$/i.test(pattern);
  }
}
