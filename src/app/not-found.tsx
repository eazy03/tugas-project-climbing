// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-white text-center p-4">
      
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="fw-bold text-dark mb-3">Jalur Buntu! 🧗‍♂️</h2>
      
      <p className="lead text-secondary mb-4" style={{ maxWidth: '600px' }}>
        Oops! Sepertinya kamu tersesat di jalur yang salah. 
        Halaman yang kamu cari tidak ditemukan atau mungkin sudah longsor (dihapus).
      </p>

      {/* Ilustrasi Error (Opsional) */}
      <div className="mb-4 text-secondary">
        ( x _ x ) <br/>
        /|\ <br/>
        / \
      </div>

      <Link href="/" className="btn btn-primary btn-lg rounded-pill px-5 shadow">
        Kembali ke Basecamp (Home)
      </Link>
      
    </div>
  );
}