import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

const { name, email, message } = req.body;

if (!name || !email || !message) {
  return res.status(400).json({ message: 'Faltan campos obligatorios' });
}


  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  // Configurá el transporter con tu cuenta SMTP (Gmail, Outlook, etc)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.SMTP_USER, // usuario SMTP en variables de entorno
      pass: process.env.SMTP_PASS, // contraseña SMTP en variables de entorno
    },
  });

  const mailOptions = {
    from: `"Nuevo Rumbo Laboral" <${process.env.SMTP_USER}>`,
    to: "info@nuevorumbolaboral.com.ar", // tu email para recibir mensajes
    subject: `Nuevo contacto desde la web de ${nombre}`,
    text: `Email: ${email}\nMensaje: ${mensaje}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
}
