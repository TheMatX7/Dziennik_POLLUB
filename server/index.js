require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // przy produkcji ogranicz origin(y)
app.use(express.json());

// API auth
app.use('/api/auth', authRoutes);

// Protected example
app.get('/api/profile', authMiddleware, (req, res) => {
  const userId = req.user.id;
  db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) return res.status(500).json({ error: 'Błąd bazy' });
    if (!row) return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    res.json({ user: row });
  });
});

// Optional: serve static frontend from public when hosting together
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});