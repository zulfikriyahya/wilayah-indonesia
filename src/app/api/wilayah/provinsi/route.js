// ============================================
// FILE: app/api/wilayah/provinsi/route.js
// GET semua provinsi (kode 2 digit)
// ============================================
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM wilayah WHERE LENGTH(kode) = 2 ORDER BY kode ASC"
    );

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
