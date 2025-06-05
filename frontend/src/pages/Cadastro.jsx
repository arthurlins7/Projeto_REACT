import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Cadastro() {
  const [dados, setDados] = useState({
    email: '', senha: '', confirmaSenha: '', nome: '', cpf: '', nascimento: '', telefone: '', civil: 'Solteiro(a)', escolaridade: '2º grau completo'
  });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const senhaValida = (s) => /[A-Z]/.test(s) && /\d/.test(s) && /[@#$%&*!?/\\|\-\_\+=.]/.test(s) && !/[¨{}\[\]´`~^:;<>,“‘]/.test(s) && s.length >= 6;

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  const nomeValido = (nome) => nome.trim().split(" ").length >= 2 && !/[¨{}\[\]´`~^:;<>,“‘]/.test(nome);

  const incluir = async () => {
    const { email, senha, confirmaSenha, nome, cpf, nascimento, telefone, civil, escolaridade } = dados;
    const idade = new Date().getFullYear() - new Date(nascimento).getFullYear();

    if (!email.includes('@')) return setMensagem("E-mail inválido.");
    if (!senhaValida(senha)) return setMensagem("Senha inválida.");
    if (senha !== confirmaSenha) return setMensagem("As senhas não coincidem.");
    if (!nomeValido(nome)) return setMensagem("Nome inválido.");
    if (!validarCPF(cpf)) return setMensagem("CPF inválido.");
    if (!nascimento || idade < 18) return setMensagem("Cliente deve ser maior de idade.");
    if (telefone && !/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(telefone)) return setMensagem("Telefone inválido.");

    try {
      const resposta = await fetch("http://localhost:3001/api/clientes/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, nome, cpf, nascimento, telefone, civil, escolaridade })
      });

      const dadosAPI = await resposta.json();

      if (resposta.ok) {
        setMensagem("Cadastro realizado com sucesso.");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMensagem(dadosAPI.mensagem || "Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  const limpar = () => {
    setDados({ email: '', senha: '', confirmaSenha: '', nome: '', cpf: '', nascimento: '', telefone: '', civil: 'Solteiro(a)', escolaridade: '2º grau completo' });
    setMensagem('');
  };

  return (
    <>
      <Header />
      <main>
        <form id="form-cadastro">
          {/* ... os campos continuam iguais ... */}
          <label>Email (Login):</label><br />
          <input type="email" value={dados.email} onChange={e => setDados({ ...dados, email: e.target.value })} /><br /><br />
          <label>Senha:</label><br />
          <input type="password" value={dados.senha} onChange={e => setDados({ ...dados, senha: e.target.value })} /><br /><br />
          <label>Confirme a Senha:</label><br />
          <input type="password" value={dados.confirmaSenha} onChange={e => setDados({ ...dados, confirmaSenha: e.target.value })} /><br /><br />
          <p><strong>Regras de Senha:</strong><br />
            Mínimo 6 caracteres, com 1 número, 1 maiúscula e 1 especial permitido.<br />
            Proibidos: ¨ {`{`} {`]`} ´ ` ~ ^ : ; &lt; &gt; , “ ‘
          </p>
          <label>Nome Completo:</label><br />
          <input type="text" value={dados.nome} onChange={e => setDados({ ...dados, nome: e.target.value })} /><br /><br />
          <label>CPF:</label><br />
          <input type="text" maxLength="14" value={dados.cpf} onChange={e => setDados({ ...dados, cpf: e.target.value })} /><br /><br />
          <label>Data de Nascimento:</label><br />
          <input type="date" value={dados.nascimento} onChange={e => setDados({ ...dados, nascimento: e.target.value })} /><br /><br />
          <label>Telefone (opcional):</label><br />
          <input type="text" value={dados.telefone} onChange={e => setDados({ ...dados, telefone: e.target.value })} /><br /><br />
          <label>Estado Civil:</label><br />
          {["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"].map(op => (
            <label key={op}><input type="radio" name="civil" value={op} checked={dados.civil === op} onChange={e => setDados({ ...dados, civil: e.target.value })} /> {op} </label>
          ))}<br /><br />
          <label>Escolaridade:</label><br />
          <select value={dados.escolaridade} onChange={e => setDados({ ...dados, escolaridade: e.target.value })}>
            <option value="1º grau incompleto">1º grau incompleto</option>
            <option value="1º grau completo">1º grau completo</option>
            <option value="2º grau completo">2º grau completo</option>
            <option value="Nível superior">Nível superior</option>
            <option value="Pós-graduado">Pós-graduado</option>
          </select><br /><br />
          <button type="button" onClick={incluir}>Incluir</button>
          <button type="button" onClick={limpar}>Limpar</button>
          <button type="button" onClick={() => navigate(-1)}>Voltar</button>
          <p style={{ fontWeight: 'bold' }}>{mensagem}</p>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Cadastro;
