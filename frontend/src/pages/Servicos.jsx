import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Servicos() {
  const [usuario, setUsuario] = useState(null);
  const [servico, setServico] = useState("Desenvolvimento de Sistema");
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const precos = {
    "Desenvolvimento de Sistema": 15000,
    "Consultoria em Infraestrutura": 2000,
    "Suporte Técnico": 650
  };

  const prazos = {
    "Desenvolvimento de Sistema": 14,
    "Consultoria em Infraestrutura": 7,
    "Suporte Técnico": 3
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioLogado");
    if (storedUser) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (err) {
        console.error("Erro ao parsear usuário:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (usuario?.email) {
      carregarSolicitacoes();
    }
  }, [usuario]);

  const carregarSolicitacoes = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/solicitacoes/${usuario.email}`);
      const dados = await res.json();
      if (res.ok) {
        setSolicitacoes(dados);
        setMensagem('');
      } else {
        setMensagem(dados.mensagem || "Erro ao carregar solicitações.");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const adicionarSolicitacao = async () => {
    const hoje = new Date();
    const dataPedido = hoje.toISOString().split('T')[0];
    const dataPrevista = new Date(hoje.getTime() + prazos[servico] * 86400000).toISOString().split('T')[0];

    const nova = {
      email: usuario.email,
      servico,
      preco: precos[servico],
      status: "EM ELABORAÇÃO",
      dataPedido,
      dataPrevista
    };

    try {
      const res = await fetch("http://localhost:3001/api/solicitacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nova)
      });

      const dados = await res.json();

      if (res.ok) {
        setMensagem("Solicitação cadastrada com sucesso.");
        carregarSolicitacoes();
      } else {
        setMensagem(dados.mensagem || "Erro ao cadastrar solicitação.");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const excluirSolicitacao = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/solicitacoes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMensagem("Solicitação excluída.");
        carregarSolicitacoes();
      } else {
        setMensagem("Erro ao excluir solicitação.");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <Header />
      <main style={{ padding: '1rem', color: 'white' }}>
        <section>
          <h2>Usuário</h2>
          {usuario ? (
            <p><strong>Nome:</strong> {usuario.nome}</p>
          ) : (
            <p style={{ color: 'red' }}>Usuário não autenticado.</p>
          )}
        </section>

        {usuario && (
          <>
            <section>
              <h2>Solicitações Realizadas</h2>
              {mensagem && <p style={{ fontWeight: 'bold', color: 'red' }}>{mensagem}</p>}

              {solicitacoes.length === 0 ? (
                <p>Nenhuma solicitação registrada.</p>
              ) : (
                <table border="1" cellPadding="8" style={{ backgroundColor: '#222', color: 'white', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Data do Pedido</th>
                      <th>#</th>
                      <th>Serviço</th>
                      <th>Status</th>
                      <th>Preço (R$)</th>
                      <th>Data Prevista</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitacoes.map((s, i) => (
                      <tr key={s.id}>
                        <td>{s.dataPedido}</td>
                        <td>{(i + 1).toString().padStart(3, '0')}</td>
                        <td>{s.servico}</td>
                        <td>{s.status}</td>
                        <td>{s.preco}</td>
                        <td>{s.dataPrevista}</td>
                        <td>
                          <button onClick={() => excluirSolicitacao(s.id)}>Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            <section style={{ marginTop: '2rem' }}>
              <h2>Nova Solicitação</h2>
              <form>
                <label>Serviço de TI:</label><br />
                <select value={servico} onChange={e => setServico(e.target.value)}>
                  <option value="Desenvolvimento de Sistema">Desenvolvimento de Sistema</option>
                  <option value="Consultoria em Infraestrutura">Consultoria em Infraestrutura</option>
                  <option value="Suporte Técnico">Suporte Técnico</option>
                </select><br /><br />

                <label>Preço (R$):</label> {precos[servico]}<br />
                <label>Prazo (dias):</label> {prazos[servico]}<br />
                <label>Data Prevista:</label> {new Date(Date.now() + prazos[servico] * 86400000).toLocaleDateString()}<br />
                <label>Status:</label> EM ELABORAÇÃO<br /><br />

                <button type="button" onClick={adicionarSolicitacao}>Incluir Solicitação</button>
              </form>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Servicos;
