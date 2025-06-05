import React from 'react';

function Footer() {
  return (
    <footer>
      <section>
        <h3>Contato</h3>
        <ul>
          <li>Telefone: (11) 1234-5678</li>
          <li>WhatsApp: (11) 91234-5678</li>
          <li><a href="mailto:contato@NextLayerTI.com">contato@NextLayerTI.com</a></li>
        </ul>
      </section>

      <section>
        <h3>Endereço</h3>
        <p>Avenida, Cais do Apolo, 77, Recife - PE, 50030-220</p>
      </section>

      <section>
        <h3>Formas de Pagamento</h3>
        <div className="pagamentos">
          <img src="/img/imagem5.png" alt="Boleto" />
          <img src="/img/imagem6.jpeg" alt="Cartão" />
          <img src="/img/imagem7.png" alt="PIX" />
        </div>
      </section>
    </footer>
  );
}

export default Footer;
