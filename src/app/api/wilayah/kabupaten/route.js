import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const provinsi = searchParams.get("provinsi"); // kode provinsi

    let query = "SELECT * FROM wilayah WHERE LENGTH(kode) = 5";
    const params = [];

    if (provinsi) {
      query += " AND kode LIKE ?";
      params.push(`${provinsi}.%`);
    }

    query += " ORDER BY kode ASC";

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
