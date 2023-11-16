const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware para processar solicitações JSON
app.use(bodyParser.json());

// Configuração do transporte de e-mail (substitua com suas próprias configurações)
const transporter = nodemailer.createTransport({
  service: 'Hotmail',
  auth: {
    user: 'andrecidre@hotmail.com',
    pass: '@anD180191',
  },
});

// Rota para enviar e-mails
app.post('/api/send-email', (req, res) => {
  const { nome, email, assunto, texto } = req.body;

  // Configuração do e-mail
  const mailOptions = {
    from: 'andrecidre@hotmail.com',
    to: 'andrecidre@hotmail.com', // E-mail de destino
    subject: assunto,
    text: `${nome} (${email}) enviou a seguinte mensagem:\n\n${texto}`,
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).json({ success: false, message: 'Erro ao enviar e-mail' });
    } else {
      console.log('E-mail enviado:', info.response);
      res.status(200).json({ success: true, message: 'E-mail enviado com sucesso' });
    }
  });
});

const PORT = 3003;

server.use(middlewares);

// Add custom routes for pagination
server.get('/textos', (req, res) => {
  const page = req.query._page ? parseInt(req.query._page, 10) : 1;
  const limit = req.query._limit ? parseInt(req.query._limit, 10) : 4;

  const start = (page - 1) * limit;
  const end = start + limit;
  const total = router.db.get('meta.total').value();

  const textos = router.db
    .get('textos')
    .value()
    .slice(start, end);

  res.setHeader('X-Total-Count', total);
  res.json(textos);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
