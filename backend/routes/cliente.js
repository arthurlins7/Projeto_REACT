const express = require('express');
const router = express.Router();
const db = require('../data/db');

// Cadastro de cliente
router.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  db.get('SELECT * FROM clientes WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json({ status: 'erro', mensagem: err.message });
    if (row) return res.status(400).json({ status: 'erro', mensagem: 'Email já cadastrado.' });

    db.run('INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (e) => {
      if (e) return res.status(500).json({ status: 'erro', mensagem: e.message });
      return res.json({ status: 'sucesso' });
    });
  });
});

// Troca de senha
router.put('/senha', (req, res) => {
  const { email, novaSenha } = req.body;
  if (!email || !novaSenha) return res.status(400).json({ status: 'erro', mensagem: 'Dados incompletos.' });

  db.run('UPDATE clientes SET senha = ? WHERE email = ?', [novaSenha, email], function (err) {
    if (err) return res.status(500).json({ status: 'erro', mensagem: err.message });
    if (this.changes === 0) return res.status(404).json({ status: 'erro', mensagem: 'Usuário não encontrado.' });
    return res.json({ status: 'sucesso', mensagem: 'Senha atualizada com sucesso.' });
  });
});


module.exports = router;
