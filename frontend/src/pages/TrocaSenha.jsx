import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function TrocaSenha() {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const senhaValida = (s) =>
    /[A-Z]/.test(s) &&
    /\d/.test(s) &&
    /[@#$%&*!?/\\|\-\_\+=.]/.test(s) &&
    !/[¨{}\[\]´`~^:;<>,“‘]/.test(s) &&
    s.length >= 6;

  const trocarSenha = async () => {
    if (!email || !novaSenha || !confirmar) {
      setMensagem("Todos os campos devem ser preenchidos.");
      return;
    }

    if (!senhaValida(novaSenha)) {
      setMensagem("A senha não atende às regras.");
      return;
    }

    if (novaSenha !== confirmar) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3001/api/clientes/senha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, novaSenha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem("Senha alterada com sucesso.");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMensagem(dados.mensagem || "Erro ao trocar senha.");
      }
    } catch (erro) {
      console.error("Erro ao conectar com o backend:", erro);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  const limpar = () => {
    setEmail('');
    setNovaSenha('');
    setConfirmar('');
    setMensagem('');
  };

  return (
    <>
      <Header />
      <main>
        <form>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label htmlFor="novaSenha">Nova Senha:</label>
          <input
            type="password"
            id="novaSenha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <br />

          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmarSenha"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />
          <br />

          <p><strong>Regras:</strong> Mín. 6 caracteres, 1 letra maiúscula, 1 número, 1 símbolo permitido. Proibidos: ¨{}[]´`~^:;“‘</p>

          <button type="button" className="btn" onClick={trocarSenha}>Trocar Senha</button>
          <button type="button" className="btn" onClick={limpar}>Limpar</button>

          <p style={{ fontWeight: 'bold', color: mensagem.includes("sucesso") ? "#4fc3f7" : "red" }}>{mensagem}</p>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default TrocaSenha;
