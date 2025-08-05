
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());       
app.use(express.urlencoded({ extended: true }));  

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const DESTINO = 'info@nuevorumbolaboral.com.ar';

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,    
    to: DESTINO,
    subject: 'Contacto desde página web',
    text: `
Nuevo mensaje de contacto:
  
Nombre: ${name}
Email:  ${email}

Mensaje:
${message}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Mensaje enviado:', info.messageId);
    res.json({ message: 'Mensaje enviado con éxito!' });
  } catch (err) {
    console.error('❌ Error al enviar correo:', err);
    res.status(500).json({ error: `Error al enviar el mensaje: ${err.message}` });
  }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor Express corriendo en http://0.0.0.0:${PORT}`);
});

console.log('USER:', process.env.SMTP_USER);
console.log('PASS:', process.env.SMTP_PASS ? 'CARGADA ✅' : 'NO CARGADA ❌');

