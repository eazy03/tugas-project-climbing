// src/lib/db.ts
import Database from 'better-sqlite3';
import path from 'path';

// Nama file database
const dbPath = path.join(process.cwd(), 'climbing-app.db');
const db = new Database(dbPath);

// Fungsi inisialisasi tabel
const initDb = () => {
  // Kita buat tabel 'spots' untuk menyimpan data tebing
  const sql = `
    CREATE TABLE IF NOT EXISTS spots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,       -- Nama Tebing
      location TEXT NOT NULL,   -- Lokasi (Kota/Daerah)
      grade TEXT NOT NULL,      -- Tingkat Kesulitan (Misal: 5.10a)
      type TEXT NOT NULL,       -- Jenis (Sport/Trad/Boulder)
      description TEXT,         -- Deskripsi
      imageUrl TEXT,            -- Link Foto
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.exec(sql);
};

initDb(); // Jalankan saat file dipanggil

export default db;