const express = require('express');
const router = express.Router();
const db = require('../data/db');

// Buscar solicitações por e-mail do cliente
router.get('/:email', (req, res) => {
  const { email } = req.params;

  db.get('SELECT id FROM clientes WHERE email = ?', [email], (err, cliente) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao buscar cliente.', erro: err.message });
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado.' });

    db.all(`
      SELECT s.id, s.data_pedido AS dataPedido, s.status, s.data_prevista AS dataPrevista, 
             s.preco, sv.descricao AS servico
      FROM solicitacoes s
      JOIN servicos sv ON sv.id = s.servico_id
      WHERE s.cliente_id = ?
      ORDER BY s.data_pedido DESC
    `, [cliente.id], (e, rows) => {
      if (e) return res.status(500).json({ mensagem: 'Erro ao buscar solicitações.', erro: e.message });
      return res.json(rows);
    });
  });
});

// Criar nova solicitação
router.post('/', (req, res) => {
  const { email, servico, status, preco, dataPedido, dataPrevista } = req.body;

  if (!email || !servico || !status || !preco || !dataPedido || !dataPrevista) {
    return res.status(400).json({ mensagem: 'Dados incompletos.' });
  }

  db.get('SELECT id FROM clientes WHERE email = ?', [email], (err1, cliente) => {
    if (err1 || !cliente) return res.status(400).json({ mensagem: 'Cliente não encontrado.' });

    db.get('SELECT id FROM servicos WHERE descricao = ?', [servico], (err2, servicoRow) => {
      if (err2 || !servicoRow) return res.status(400).json({ mensagem: 'Serviço não encontrado.' });

      db.run(
        `INSERT INTO solicitacoes 
          (cliente_id, servico_id, status, preco, data_pedido, data_prevista) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [cliente.id, servicoRow.id, status, preco, dataPedido, dataPrevista],
        function (err3) {
          if (err3) return res.status(500).json({ mensagem: 'Erro ao salvar solicitação.', erro: err3.message });
          return res.status(201).json({ id: this.lastID, mensagem: 'Solicitação criada com sucesso.' });
        }
      );
    });
  });
});

// Excluir solicitação por ID
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM solicitacoes WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ mensagem: err.message });
    if (this.changes === 0) return res.status(404).json({ mensagem: 'Solicitação não encontrada.' });
    return res.json({ mensagem: 'Solicitação excluída.' });
  });
});

module.exports = router;
