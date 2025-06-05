import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const realizarLogin = async () => {
    if (!email || !senha) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));
        localStorage.setItem("logado", "true");
        setMensagem("Login realizado com sucesso.");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMensagem(dados.mensagem || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  const limparCampos = () => {
    setEmail('');
    setSenha('');
    setMensagem('');
  };

  return (
    <>
      <Header />
      <main>
        <form id="form-login">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />

          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" value={senha} onChange={e => setSenha(e.target.value)} /><br /><br />

          <button type="button" onClick={realizarLogin}>Realizar Login</button>
          <button type="button" onClick={limparCampos}>Limpar</button><br /><br />

          <Link to="/troca-senha">Trocar Senha</Link> | <Link to="/cadastro">Cadastrar-se</Link>

          <p style={{ color: "red", fontWeight: "bold" }}>{mensagem}</p>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Login;
