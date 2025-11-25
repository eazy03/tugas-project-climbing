// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-vh-100 bg-white">
      
      {/* Navbar Hitam */}
      <nav className="navbar navbar-dark bg-dark shadow-sm py-3">
        <div className="container">
          <span className="navbar-brand mb-0 h1 fw-bold">🧗‍♂️ IndoClimb Info</span>
        </div>
      </nav>

      {/* Hero Section (Konten Utama) */}
      <div className="container py-5">
        <div className="row align-items-center g-5">
          
          {/* Bagian Kiri: Teks & Identitas */}
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold text-dark mb-3">
              Database Jalur <span className="text-primary">Panjat Tebing</span> Indonesia
            </h1>
            <p className="lead text-secondary mb-4">
              Temukan informasi tebing, tingkat kesulitan (grade), dan lokasi pemanjatan terbaik di nusantara.
            </p>

            {/* Kotak Identitas Mahasiswa */}
            <div className="card border-0 shadow-sm bg-light mb-4">
              <div className="card-body p-4">
                <h6 className="text-uppercase text-muted fw-bold small">Created By:</h6>
                <h3 className="fw-bold text-dark mb-1">[ISI NAMA KAMU]</h3>
                <h5 className="text-secondary">NIM: [ISI NIM KAMU]</h5>
              </div>
            </div>

            {/* Tombol Mulai (Nanti arahnya ke halaman List Data) */}
            <div className="d-flex gap-3">
              <Link href="/explore" className="btn btn-primary btn-lg rounded-pill px-4">
                Lihat Data Tebing
              </Link>
              <button className="btn btn-outline-dark btn-lg rounded-pill px-4">
                cuaca
                <div className="d-flex gap-3">
  <Link href="/explore" className="btn btn-primary btn-lg rounded-pill px-4">
    Lihat Data Tebing
  </Link>
  
  {/* UPDATE TOMBOL INI: */}
  <Link href="/cuaca" className="btn btn-outline-dark btn-lg rounded-pill px-4">
    Cek Cuaca ☁️
  </Link>
</div>
              </button>
            </div>
          </div>

          {/* Bagian Kanan: Gambar */}
          <div className="col-lg-6">
            <div className="position-relative">
              {/* Gambar Climbing Keren */}
              <img 
                src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1000&auto=format&fit=crop" 
                alt="Rock Climber" 
                className="img-fluid rounded-4 shadow-lg"
              />
              
              {/* Badge Hiasan */}
              <div className="position-absolute bottom-0 end-0 bg-warning p-3 m-3 rounded-3 shadow text-dark fw-bold">
                ⚠️ Safety First
              </div>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}