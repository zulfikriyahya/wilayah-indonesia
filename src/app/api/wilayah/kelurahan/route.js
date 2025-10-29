// ============================================
// FILE: app/api/wilayah/kelurahan/route.js
// GET kelurahan/desa by kecamatan (dengan kodepos)
// ============================================
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const kecamatan = searchParams.get("kecamatan"); // kode kecamatan

    let query = `
      SELECT w.*, wk.kodepos 
      FROM wilayah w
      LEFT JOIN wilayah_kodepos wk ON w.kode = wk.kode
      WHERE LENGTH(w.kode) = 13
    `;
    const params = [];

    if (kecamatan) {
      query += " AND w.kode LIKE ?";
      params.push(`${kecamatan}.%`);
    }

    query += " ORDER BY w.kode ASC";

    const [rows] = await pool.query(query, params);

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
