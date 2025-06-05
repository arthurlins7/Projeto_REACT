import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const logado = localStorage.getItem("logado") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("logado", "false");
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo-nome">
          <img src="/img/logo.png" alt="Logo da empresa" className="logo" />
          <h1 className="empresa-nome">NextLayer TI</h1>
        </div>

        <p className="slogan">A solução para o seu negócio!</p>

        <nav>
          <ul className="menu">
            {!logado && <li><Link to="/login" className="btn">Login</Link></li>}
            {!logado && <li><Link to="/cadastro" className="btn">Cadastrar-se</Link></li>}
            {logado && <li><Link to="/servicos" className="btn">Solicitar Serviços</Link></li>}
            {logado && <li><button onClick={handleLogout} className="btn">Logout</button></li>}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
