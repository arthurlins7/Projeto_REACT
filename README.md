
# 💻 Projeto AV2 – Sistema de Solicitação de Serviços de TI

Este projeto full stack simula um sistema de atendimento técnico de uma empresa fictícia chamada **NextLayer TI**, permitindo que clientes se cadastrem, realizem login, troquem suas senhas e solicitem serviços de TI.  
O sistema é dividido em frontend (React) e backend (Node.js + Express), com persistência em SQLite.

---

## 📁 Estrutura do Projeto

```
projeto_av2/
├── backend/
│   ├── server.js                 # Inicializa o servidor
│   ├── data/
│   │   └── db.js                # Conexão com banco SQLite
│   ├── routes/
│   │   ├── auth.js              # Login e troca de senha
│   │   ├── cliente.js           # Cadastro de clientes
│   │   ├── servico.js           # (opcional) Cadastro de serviços
│   │   └── solicitacao.js       # Gerenciamento de solicitações
├── frontend/
│   ├── public/                  # index.html e imagens
│   └── src/
│       ├── pages/              # Telas: Login, Cadastro, Serviços etc.
│       ├── components/         # Header, Footer
│       ├── App.jsx             # Roteador principal
│       └── main.jsx            # Ponto de entrada do React
```

---

## 🚀 Como Executar

### 1. Instalar dependências:

```bash
cd backend
npm install
cd ../frontend
npm install
```

---

### 2. Rodar o backend

```bash
cd backend
node server.js
```

- Servidor será iniciado em `http://localhost:3001`
- Banco de dados é um arquivo `.db` criado automaticamente em `/backend/data/`

---

### 3. Rodar o frontend

```bash
cd frontend
npm run dev
```

- Interface disponível em `http://localhost:5173`

---

## 📌 Funcionalidades

### 👥 Cliente
- Cadastro com validação de CPF, nome, telefone e senha segura
- Login com verificação contra banco de dados
- Troca de senha (requer validação da senha atual)

### 📋 Solicitação de Serviços
- Tela protegida por login
- Visualização de todas as solicitações do usuário
- Cadastro de nova solicitação (escolhendo tipo de serviço)
- Exclusão de solicitações

### 🔐 Autenticação
- O estado de login é armazenado no `localStorage`
- Usuário precisa estar logado para acessar `/servicos`

---

## 📡 Comunicação Frontend ↔ Backend

- Todo o frontend se comunica com o backend via `fetch()` (API REST)
- Respostas são em JSON
- O frontend usa os dados retornados para armazenar o login e renderizar a interface

---

## 🗃 Banco de Dados (SQLite)

As principais tabelas são:

### `clientes`
| id | nome                | email               | senha            |
|----|---------------------|---------------------|------------------|

### `solicitacoes`
| id | email               | servico                 | status           | preco | dataPedido  | dataPrevista |
|----|---------------------|-------------------------|------------------|-------|-------------|---------------|

---

## 🛠 Tecnologias

- **Frontend:** React 19 + Vite
- **Backend:** Node.js + Express
- **Banco:** SQLite
- **Gerenciador de pacotes:** npm

---

## 🙋 Autor

**Arthur Lins da Gama**  
Email: alg2@cesar.school

Projeto desenvolvido para avaliação da AV2 na disciplina de Desenvolvimento Web Full Stack.
