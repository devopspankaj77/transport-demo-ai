const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.post('/bookings', async (req, res) => {
  const { passengerName, destination, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO bookings (passenger_name, destination, booking_date) VALUES ($1, $2, $3) RETURNING *',
      [passengerName, destination, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
