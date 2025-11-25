// src/app/explore/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function DetailPage() {
  const params = useParams();
  const id = params.id;
  
  // State untuk menampung data satu spot
  const [spot, setSpot] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ambil data detail saat halaman dibuka
    const fetchDetail = async () => {
      try {
        const res = await fetch('/api/spots'); // Kita pakai API yang sama
        const data = await res.json();
        const found = data.find((item: any) => item.id == id);
        setSpot(found);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    
    fetchDetail();
  }, [id]);

  if (isLoading) return <div className="text-center mt-5">Loading Detail...</div>;
  if (!spot) return <div className="text-center mt-5">Data tidak ditemukan!</div>;

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        
        {/* Tombol Back (Soal No 4b) */}
        <Link href="/explore" className="btn btn-outline-secondary mb-4">
          &larr; Kembali ke List
        </Link>

        <div className="card shadow-lg border-0 overflow-hidden rounded-4">
          <div className="row g-0">
            
            {/* Kolom Gambar */}
            <div className="col-md-6 bg-dark">
              <img 
                src={spot.imageUrl || "https://placehold.co/600x600?text=No+Image"} 
                className="w-100 h-100 object-fit-cover"
                alt={spot.name}
                style={{ minHeight: '400px' }}
              />
            </div>

            {/* Kolom Informasi Detail */}
            <div className="col-md-6">
              <div className="card-body p-5">
                <span className="badge bg-warning text-dark mb-2">Grade: {spot.grade}</span>
                <span className="badge bg-primary ms-2 mb-2">{spot.type}</span>
                
                <h1 className="fw-bold display-5 text-dark mb-3">{spot.name}</h1>
                
                <h5 className="text-muted mb-4">
                  📍 Lokasi: {spot.location}
                </h5>

                <hr />

                <h5 className="fw-bold mt-4">Deskripsi Jalur</h5>
                <p className="card-text text-secondary fs-5" style={{ lineHeight: '1.8' }}>
                  {spot.description || "Tidak ada deskripsi tersedia untuk tebing ini."}
                </p>

                <div className="mt-5">
                   <button className="btn btn-dark w-100 py-3 rounded-pill">
                     🗺️ Lihat di Peta (Coming Soon)
                   </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}