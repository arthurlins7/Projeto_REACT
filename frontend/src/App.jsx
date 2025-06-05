import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import TrocaSenha from './pages/TrocaSenha';
import Servicos from './pages/Servicos';
import CadastrarServicoTI from './pages/CadastrarServicoTI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/troca-senha" element={<TrocaSenha />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/novo-servico" element={<CadastrarServicoTI />} />
      </Routes>
    </Router>
  );
}

export default App;
