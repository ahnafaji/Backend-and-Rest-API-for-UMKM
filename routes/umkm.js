const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET semua data
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM umkm_unggulan ORDER BY id ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET berdasarkan nama UMKM
router.get('/nama/:nama', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM umkm_unggulan WHERE nama_umkm ILIKE $1 ORDER BY id ASC',
      [`%${req.params.nama}%`]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM umkm_unggulan WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST data baru
router.post('/', async (req, res) => {
  try {
    const { nama_umkm, nama_pemilik, no_whatsapp, alamat, deskripsi_singkat } = req.body;
    if (!nama_umkm || !nama_pemilik || !no_whatsapp || !alamat || !deskripsi_singkat) {
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
    }
    const result = await pool.query(
      `INSERT INTO umkm_unggulan (nama_umkm, nama_pemilik, no_whatsapp, alamat, deskripsi_singkat) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nama_umkm, nama_pemilik, no_whatsapp, alamat, deskripsi_singkat]
    );
    res.status(201).json({ success: true, message: 'Data berhasil ditambahkan', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update data
router.put('/:id', async (req, res) => {
  try {
    const { nama_umkm, nama_pemilik, no_whatsapp, alamat, deskripsi_singkat } = req.body;
    const result = await pool.query(
      `UPDATE umkm_unggulan
       SET nama_umkm=$1, nama_pemilik=$2, no_whatsapp=$3, alamat=$4, deskripsi_singkat=$5, updated_at=CURRENT_TIMESTAMP WHERE id=$6 RETURNING *`,
      [nama_umkm, nama_pemilik, no_whatsapp, alamat, deskripsi_singkat, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }
    res.json({ success: true, message: 'Data berhasil diperbarui', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE data
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM umkm_unggulan WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }
    res.json({ success: true, message: 'Data berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;