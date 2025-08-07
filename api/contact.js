// /api/contact.js
import formidable from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }
  const form = formidable({
    multiples: false,
    maxFileSize: 5 * 1024 * 1024, 
    keepExtensions: true
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error al procesar el formulario' });
    }
    const nombre = fields.nombre?.[0] || '';
    const email = fields.email?.[0] || '';
    const mensaje = fields.mensaje?.[0] || '';
    const archivoCV = Array.isArray(files.cv) ? files.cv[0] : files.cv

    if (!nombre || !email || !mensaje || !archivoCV) {
      return res.status(400).json({ message: 'Faltan campos obligatorios o archivo' });
    }

    try {
      const fileContent = fs.readFileSync(archivoCV.filepath);
      const fileName = archivoCV.originalFilename;
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      transporter.sendMail({
        from: `"Nuevo Rumbo Laboral" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: 'Nuevo mensaje de contacto con CV',
        text: `Nombre: ${nombre} 
               Email: ${email}
               Mensaje: ${mensaje}
               `,
        attachments: [
          {
            filename: fileName,
            content: fileContent
          }
        ]
      });

      return res.status(200).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
      console.error('Error al enviar el email:', error);
      return res.status(500).json({ message: 'Error al enviar el email' });
    }
  });
}
