const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.post('/cadastrar', (req, res) => {
  const { descricao } = req.body;
  db.run('INSERT INTO servicos (descricao) VALUES (?)', [descricao], (err) => {
    if (err) return res.status(500).json({ status: 'erro', mensagem: err.message });
    return res.json({ status: 'sucesso' });
  });
});

router.get('/listar', (req, res) => {
  db.all('SELECT * FROM servicos', [], (err, rows) => {
    if (err) return res.status(500).json({ status: 'erro', mensagem: err.message });
    return res.json({ status: 'sucesso', dados: rows });
  });
});

module.exports = router;
