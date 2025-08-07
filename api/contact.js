import { formidable } from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error al parsear formulario:', err);
      return res.status(500).json({ message: 'Error al procesar el formulario' });
    }

    const { nombre, email, mensaje } = fields;
    const cv = files.cv;

    if (!nombre || !email || !mensaje || !cv) {
      return res.status(400).json({ message: 'Faltan campos obligatorios o archivo' });
    }

    const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    const ext = cv.originalFilename?.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(`.${ext}`)) {
      return res.status(400).json({ message: 'Tipo de archivo no permitido' });
    }

    if (cv.size > maxSize) {
      return res.status(400).json({ message: 'El archivo excede el tamaño permitido (5 MB)' });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Nuevo Rumbo Laboral" <${process.env.SMTP_USER}>`,
      to: "info@nuevorumbolaboral.com.ar",
      subject: `Nuevo contacto de ${nombre}`,
      text: `Email: ${email}\n\nMensaje:\n${mensaje}`,
      attachments: [
        {
          filename: cv.originalFilename,
          content: fs.createReadStream(cv.filepath)
        }
      ]
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Mensaje enviado con éxito' });
    } catch (error) {
      console.error('❌ Error al enviar el mensaje:', error);
      return res.status(500).json({ message: 'Error al enviar el mensaje' });
    }
  });
}
