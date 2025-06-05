const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com banco SQLite
const db = new sqlite3.Database(path.resolve(__dirname, 'data', 'database.db'), (err) => {
  if (err) return console.error('Erro ao conectar ao SQLite:', err.message);
  console.log('Conectado ao banco de dados SQLite.');
});

// Inicializar tabelas e dados
db.serialize(() => {
  // Tabelas
  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS servicos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS solicitacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    servico_id INTEGER NOT NULL,
    data_pedido TEXT NOT NULL,
    status TEXT NOT NULL,
    data_prevista TEXT NOT NULL,
    preco REAL NOT NULL,
    FOREIGN KEY(cliente_id) REFERENCES clientes(id),
    FOREIGN KEY(servico_id) REFERENCES servicos(id)
  )`);

  // Inserir serviços padrão caso a tabela esteja vazia
  db.get('SELECT COUNT(*) AS total FROM servicos', (err, row) => {
    if (!err && row.total === 0) {
      const servicosPadrao = [
        "Desenvolvimento de Sistema",
        "Consultoria em Infraestrutura",
        "Suporte Técnico"
      ];
      const stmt = db.prepare('INSERT INTO servicos (descricao) VALUES (?)');
      servicosPadrao.forEach(servico => stmt.run(servico));
      stmt.finalize();
      console.log('Serviços padrão inseridos.');
    }
  });
});

// Rotas de teste
app.get('/', (req, res) => res.send('API do projeto AV2 em execução.'));

// Importar e usar rotas
const authRoutes = require('./routes/auth');
const clienteRoutes = require('./routes/cliente');
const servicoRoutes = require('./routes/servico');
const solicitacaoRoutes = require('./routes/solicitacao');

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/solicitacoes', solicitacaoRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
