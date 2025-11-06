const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email i hasło są wymagane' });

  db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ error: 'Błąd bazy' });
    if (row) return res.status(400).json({ error: 'Użytkownik już istnieje' });

    const hashed = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name || '', email, hashed], function (err) {
      if (err) return res.status(500).json({ error: 'Błąd tworzenia użytkownika' });
      const userId = this.lastID;
      const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email i hasło są wymagane' });

  db.get('SELECT id, password, name FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ error: 'Błąd bazy' });
    if (!row) return res.status(400).json({ error: 'Nieprawidłowe dane logowania' });

    const match = await bcrypt.compare(password, row.password);
    if (!match) return res.status(400).json({ error: 'Nieprawidłowe dane logowania' });

    const token = jwt.sign({ id: row.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: row.id, name: row.name, email } });
  });
});

module.exports = router;