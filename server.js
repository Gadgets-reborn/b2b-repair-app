const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Fix CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://b2b-repair-app.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

const db = new sqlite3.Database('./repair_enquiries.db');
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Initialize DB
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enquiry_number TEXT UNIQUE,
    service_type TEXT,
    total_devices INTEGER,
    total_units INTEGER,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/submit-enquiry', (req, res) => {
  const { devices, serviceType } = req.body;
  const enquiryNumber = `ENQ-${Date.now()}`;
  
  const totalDevices = devices.length;
  const totalUnits = devices.reduce((sum, d) => sum + parseInt(d.qty || 0), 0);
  
  db.run(
    `INSERT INTO enquiries (enquiry_number, service_type, total_devices, total_units) VALUES (?, ?, ?, ?)`,
    [enquiryNumber, serviceType, totalDevices, totalUnits],
    function(err) {
      if (err) {
        console.error('DB Error:', err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ 
        success: true, 
        enquiryNumber, 
        enquiryId: this.lastID,
        message: 'Enquiry submitted successfully'
      });
    }
  );
});

app.listen(PORT, () => console.log(`🚀 Backend running on :${PORT}`));
