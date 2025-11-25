// src/app/api/spots/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";

// 1. GET: Ambil semua data tebing
export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM spots ORDER BY createdAt DESC');
    const spots = stmt.all();
    return NextResponse.json(spots);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// 2. POST: Tambah data tebing baru
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi sederhana
    if (!body.name || !body.location) {
      return NextResponse.json({ error: "Nama dan Lokasi wajib diisi" }, { status: 400 });
    }

    
    const stmt = db.prepare(`
      INSERT INTO spots (name, location, grade, type, description, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    

    const result = stmt.run(
      body.name,
      body.location,
      body.grade,
      body.type,
      body.description || "",
      body.imageUrl || ""
    );

    return NextResponse.json({ 
      message: "Spot berhasil disimpan", 
      id: result.lastInsertRowid 
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}
// src/app/api/spots/route.ts

// ... (Biarkan kode GET dan POST yang sebelumnya ada di atas) ...

// 3. DELETE: Hapus data berdasarkan ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });

    const stmt = db.prepare('DELETE FROM spots WHERE id = ?');
    stmt.run(id);

    return NextResponse.json({ message: "Berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 });
  }
}

// 4. PUT: Update data (Edit)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    const stmt = db.prepare(`
      UPDATE spots 
      SET name = ?, location = ?, grade = ?, type = ?, description = ?, imageUrl = ?
      WHERE id = ?
    `);

    stmt.run(
      body.name, 
      body.location, 
      body.grade, 
      body.type, 
      body.description, 
      body.imageUrl, 
      body.id
    );

    return NextResponse.json({ message: "Berhasil diupdate" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}