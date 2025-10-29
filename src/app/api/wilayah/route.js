import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const level = searchParams.get("level"); // 2, 4, 6, 8, 10, 13 digit
    const parent = searchParams.get("parent"); // kode parent
    const search = searchParams.get("search"); // search by nama

    const offset = (page - 1) * limit;

    // Build query
    let query = "SELECT * FROM wilayah WHERE 1=1";
    let countQuery = "SELECT COUNT(*) as total FROM wilayah WHERE 1=1";
    const params = [];
    const countParams = [];

    // Filter by level (panjang kode)
    if (level) {
      query += " AND LENGTH(kode) = ?";
      countQuery += " AND LENGTH(kode) = ?";
      params.push(level);
      countParams.push(level);
    }

    // Filter by parent
    if (parent) {
      query += " AND kode LIKE ? AND kode != ?";
      countQuery += " AND kode LIKE ? AND kode != ?";
      params.push(`${parent}%`, parent);
      countParams.push(`${parent}%`, parent);
    }

    // Search by nama
    if (search) {
      query += " AND nama LIKE ?";
      countQuery += " AND nama LIKE ?";
      params.push(`%${search}%`);
      countParams.push(`%${search}%`);
    }

    // Add order and pagination
    query += " ORDER BY kode ASC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    // Execute queries
    const [rows] = await pool.query(query, params);
    const [countResult] = await pool.query(countQuery, countParams);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
