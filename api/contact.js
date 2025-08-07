// /api/contact.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log("📩 Función contact.js llamada");

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true para puerto 465, false para 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Nuevo Rumbo Laboral" <${process.env.SMTP_USER}>`,
    to: "info@nuevorumbolaboral.com.ar",
    subject: `Nuevo contacto de ${name}`,
    text: `Email: ${email}\n\nMensaje:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('❌ Error al enviar el mensaje:', error);
    return res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
}
