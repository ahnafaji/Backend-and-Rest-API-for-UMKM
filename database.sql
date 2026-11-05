CREATE TABLE UMKM_Unggulan (
    id SERIAL PRIMARY KEY,
    nama_umkm VARCHAR (100) NOT NULL,
    nama_pemilik VARCHAR (100) NOT NULL,
    no_whatsapp VARCHAR (20) NOT NULL,
    alamat TEXT NOT NULL,
    deskripsi_singkat TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO UMKM_Unggulan (nama_umkm, nama_pemilik, no_wahtsapp, alamat, deskripsi_singkat) VALUES
('Toko Sembako Sejahtera', 'Budi Santoso', '081234567890', 'Jl. Raya Tambak Boyo, Tikung, Tambakboyo, Tambakrigadung, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62281', 'Toko sembako yang menyediakan berbagai kebutuhan pokok dengan harga terjangkau.'),
('Warung Makan Lezat', 'Siti Aminah', '081987654321', 'Jl. Raya Tambak Boyo, Tikung, Tambakboyo, Tambakrigadung, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62281', 'Warung makan yang menyajikan masakan tradisional dan modern dengan cita rasa lezat.'),
('Kerajinan Tangan Kreatif', 'Andi Wijaya', '081234567891', 'Jl. Raya Tambak Boyo, Tikung, Tambakboyo, Tambakrigadung, Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62281', 'UMKM yang memproduksi kerajinan tangan unik dan kreatif dari bahan lokal.');