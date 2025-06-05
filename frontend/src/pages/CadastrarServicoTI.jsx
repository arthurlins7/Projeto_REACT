import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function CadastrarServicoTI() {
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const salvarServico = () => {
    if (!descricao) {
      setMensagem("Descrição obrigatória.");
      return;
    }

    // Em breve: chamada à API
    setMensagem("Serviço cadastrado com sucesso (simulado).");
    setDescricao("");
  };

  return (
    <>
      <Header />
      <main>
        <h2>Cadastrar Novo Serviço de TI</h2>
        <form>
          <label>Descrição do Serviço:</label><br />
          <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} /><br /><br />
          <button type="button" onClick={salvarServico}>Cadastrar</button>
        </form>
        <p style={{ fontWeight: 'bold' }}>{mensagem}</p>
      </main>
      <Footer />
    </>
  );
}

export default CadastrarServicoTI;
