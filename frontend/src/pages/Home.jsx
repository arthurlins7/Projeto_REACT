import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />

      <main>
        <section id="historia">
          <h2>Nossa História</h2>
          <p>
            A NextLayer TI foi fundada em 2010 com o objetivo de oferecer soluções tecnológicas inteligentes
            e personalizadas para empresas que desejam inovar. Com uma equipe qualificada e apaixonada por
            tecnologia, atuamos nas áreas de infraestrutura, desenvolvimento de sistemas e suporte técnico,
            sempre buscando eficiência, segurança e crescimento para nossos clientes.
          </p>
        </section>

        <section id="video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/kGzssrB-Kvk?start=2"
            title="Vídeo institucional"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </section>

        <section id="galeria">
          <h2>Nossa equipe e fundações</h2>
          <div className="fotos">
            <img src="/img/imagem1.png" alt="Equipe" />
            <img src="/img/imagem2.jpeg" alt="Escritório" />
            <img src="/img/imagem3.png" alt="Reunião" />
            <img src="/img/imagem4.jpg" alt="Servidores" />
          </div>
        </section>

        <section id="servicos">
          <h2>Serviços de TI</h2>
          <div className="servico">
            <h3>Consultoria em Infraestrutura</h3>
            <p>Montagem e manutenção de redes corporativas e servidores.</p>
          </div>
          <div className="servico">
            <h3>Desenvolvimento de Sistemas</h3>
            <p>Aplicações para aumentar a produtividade da sua empresa.</p>
          </div>
          <div className="servico">
            <h3>Suporte Técnico</h3>
            <p>Atendimento remoto e presencial para emergências de TI.</p>
          </div>
        </section>

        <section id="fundadores">
          <h2>Fundadores</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Resumo do CV</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Arthur Lins</td>
                <td>CEO</td>
                <td>Engenheiro da Computação pela UPE, com 27 anos de mercado.</td>
              </tr>
              <tr>
                <td>Márico Veiga</td>
                <td>CTO</td>
                <td>Mestre em Sistemas pela UFPE, especialista em DevOps e Cloud.</td>
              </tr>
              <tr>
                <td>Mariana Lima</td>
                <td>COO</td>
                <td>Administradora com MBA em Gestão de TI pela FGV.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
