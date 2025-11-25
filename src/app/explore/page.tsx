// src/app/explore/page.tsx
'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Penting untuk tombol Edit

type Spot = {
  id: number;
  name: string;
  location: string;
  grade: string;
  type: string;
  description: string;
  imageUrl: string;
};

export default function ExplorePage() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State Form Input
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    grade: '',
    type: 'Sport',
    description: '',
    imageUrl: ''
  });

  // Ambil data
  useEffect(() => {
    fetchSpots();
  }, []);

  const fetchSpots = async () => {
    try {
      const res = await fetch('/api/spots');
      const data = await res.json();
      setSpots(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Fungsi Tambah Data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.location) return alert("Nama & Lokasi wajib!");

    const res = await fetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Data Spot Berhasil Disimpan!');
      setFormData({ name: '', location: '', grade: '', type: 'Sport', description: '', imageUrl: '' });
      fetchSpots();
    }
  };

  // Fungsi Hapus Data (DELETE)
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus spot ini?")) return;

    const res = await fetch(`/api/spots?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert("Data berhasil dihapus!");
      fetchSpots(); // Refresh list
    } else {
      alert("Gagal menghapus.");
    }
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">🧗‍♂️ Data Spot Tebing</h2>
          <Link href="/" className="btn btn-outline-secondary btn-sm">
            &larr; Kembali ke Home
          </Link>
        </div>

        <div className="row g-4">
          {/* FORM INPUT (KIRI) */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Tambah Spot Baru</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nama Tebing</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Lokasi</label>
                    <input type="text" className="form-control" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                  </div>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label">Grade</label>
                      <input type="text" className="form-control" value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})} />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">Jenis</label>
                      <select className="form-select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                        <option value="Sport">Sport</option>
                        <option value="Trad">Trad</option>
                        <option value="Boulder">Boulder</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Link Foto</label>
                    <input type="text" className="form-control" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea className="form-control" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">+ Simpan</button>
                </form>
              </div>
            </div>
          </div>

          {/* LIST DATA (KANAN) */}
          <div className="col-md-8">
            {isLoading ? <p>Loading...</p> : (
              <div className="row g-3">
                {spots.map((item) => (
                  <div key={item.id} className="col-12">
                    <div className="card border-0 shadow-sm overflow-hidden">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img 
                            src={item.imageUrl || "https://placehold.co/600x400?text=No+Image"} 
                            className="img-fluid h-100 object-fit-cover" 
                            alt={item.name}
                            style={{ minHeight: '180px', width: '100%' }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body h-100 d-flex flex-column">
                            <div>
                                <h4 className="card-title fw-bold mb-1">{item.name}</h4>
                                <span className="badge bg-secondary me-2">{item.type}</span>
                                <span className="badge bg-warning text-dark">Grade: {item.grade}</span>
                            </div>
                            <p className="text-muted mt-2 mb-2">📍 {item.location}</p>
                            <p className="card-text text-truncate">{item.description}</p>
                            
                            {/* TOMBOL AKSI */}
                            <div className="mt-auto pt-3 d-flex gap-2">
  {/* Tombol DETAIL (Baru) */}
  <Link href={`/explore/${item.id}`} className="btn btn-sm btn-info text-white flex-grow-1">
    Detail
  </Link>
  {/* Tombol EDIT */}
  <Link href={`/explore/edit/${item.id}`} className="btn btn-sm btn-outline-warning">
    Edit
  </Link>

                              
                              {/* Tombol Delete */}
                              <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-danger">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}