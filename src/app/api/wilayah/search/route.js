import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const level = searchParams.get("level");

    if (!q || q.length < 3) {
      return NextResponse.json(
        { success: false, error: "Search query must be at least 3 characters" },
        { status: 400 }
      );
    }

    let query = "SELECT * FROM wilayah WHERE nama LIKE ?";
    const params = [`%${q}%`];

    if (level) {
      query += " AND LENGTH(kode) = ?";
      params.push(level);
    }

    query += " ORDER BY nama ASC LIMIT 100";

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
