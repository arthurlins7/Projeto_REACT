const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.get('SELECT * FROM clientes WHERE email = ? AND senha = ?', [email, senha], (err, row) => {
    if (err) return res.status(500).json({ status: 'erro', mensagem: err.message });
    if (row) return res.json({ status: 'sucesso', usuario: row });
    return res.status(401).json({ status: 'erro', mensagem: 'Credenciais inválidas.' });
  });
});

router.post('/trocar-senha', (req, res) => {
  const { email, senhaAtual, novaSenha } = req.body;
  db.get('SELECT * FROM clientes WHERE email = ? AND senha = ?', [email, senhaAtual], (err, row) => {
    if (err) return res.status(500).json({ status: 'erro', mensagem: err.message });
    if (!row) return res.status(401).json({ status: 'erro', mensagem: 'Senha atual incorreta.' });
    db.run('UPDATE clientes SET senha = ? WHERE email = ?', [novaSenha, email], (e) => {
      if (e) return res.status(500).json({ status: 'erro', mensagem: e.message });
      return res.json({ status: 'sucesso' });
    });
  });
});

module.exports = router;
