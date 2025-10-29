// ============================================
// FILE: app/api/wilayah/[kode]/route.js
// GET wilayah by kode (dengan kodepos jika ada)
// ============================================
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { kode } = params;

    // Get wilayah data
    const [wilayahRows] = await pool.query(
      "SELECT * FROM wilayah WHERE kode = ?",
      [kode]
    );

    if (wilayahRows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Wilayah not found" },
        { status: 404 }
      );
    }

    // Get kodepos if exists
    const [kodeposRows] = await pool.query(
      "SELECT kodepos FROM wilayah_kodepos WHERE kode = ?",
      [kode]
    );

    const wilayah = wilayahRows[0];
    if (kodeposRows.length > 0) {
      wilayah.kodepos = kodeposRows[0].kodepos;
    }

    return NextResponse.json({
      success: true,
      data: wilayah,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
