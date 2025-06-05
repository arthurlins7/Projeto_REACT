const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('Erro ao conectar ao SQLite:', err.message);
});

module.exports = db;
