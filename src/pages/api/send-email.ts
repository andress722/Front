// pages/api/send-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Configure o transporte do Nodemailer (substitua com as suas configurações)
      const transporter = nodemailer.createTransport({
        service: "Hotmail",
        auth: {
          user: "andrecidre@hotmail.com",
          pass: "@anD102030"
        }
      });

      // Extrair os dados do corpo da solicitação
      const { nome, email, assunto, texto } = req.body;

      // Configurar as informações do e-mail
      const mailOptions = {
        from: 'andrecidre@hotmail.com',
        to: 'andrecidre@hotmail.com',
        subject: assunto,
        text: `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\nTexto: ${texto}`,
      };

      // Enviar o e-mail
      await transporter.sendMail(mailOptions);

      // Responder com sucesso
      res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
};
