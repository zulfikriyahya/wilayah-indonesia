import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const kabupaten = searchParams.get("kabupaten"); // kode kabupaten

    let query = "SELECT * FROM wilayah WHERE LENGTH(kode) = 8";
    const params = [];

    if (kabupaten) {
      query += " AND kode LIKE ?";
      params.push(`${kabupaten}.%`);
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
