// src/app/cuaca/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CuacaPage() {
  const [weather, setWeather] = useState<any>(null);

  // Koordinat Tebing Citatah 125, Bandung
  const lat = -6.836;
  const long = 107.434;

  useEffect(() => {
    const fetchWeather = async () => {
      // API Open-Meteo (Gratis, No Key)
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&timezone=Asia%2FBangkok`;
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error("Gagal ambil cuaca", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-primary bg-gradient text-white">
      <div className="container text-center">
        <h1 className="fw-bold mb-4">☁️ Info Cuaca Tebing</h1>
        <h4 className="mb-5">Lokasi: Tebing Citatah 125, Bandung</h4>

        {weather ? (
          <div className="card text-dark shadow-lg mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body p-5">
              <h1 className="display-1 fw-bold">{weather.temperature}°C</h1>
              <p className="fs-4 text-muted">
                Angin: {weather.windspeed} km/h
              </p>
              <hr />
              <div className="alert alert-info mb-0">
                {weather.temperature > 30 ? "🔥 Cuaca Panas, bawa banyak air!" : 
                 weather.temperature < 20 ? "❄️ Sejuk, enak buat manjat!" : 
                 "✅ Cuaca Normal, Gass manjat!"}
              </div>
            </div>
          </div>
        ) : (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        <div className="mt-5">
          <Link href="/" className="btn btn-outline-light rounded-pill px-4">
            &larr; Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}