from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)  # Permitir CORS para que el frontend pueda hacer peticiones desde otro dominio

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "fedesanchez@gmail.com"
SMTP_PASSWORD = "dkqp prvz czwn lwnp"  # ← tu contraseña de aplicación


DESTINO = "fedesanchez@gmail.com"         # Email que recibe los mensajes

@app.route('/send', methods=['POST'])
def send():
    data = request.form or request.json
    nombre = data.get('name')
    email = data.get('email')
    mensaje = data.get('message')

    if not nombre or not email or not mensaje:
        return jsonify({"error": "Faltan datos requeridos"}), 400

    cuerpo = f"Nuevo mensaje de contacto:\n\nNombre: {nombre}\nEmail: {email}\nMensaje:\n{mensaje}"

    msg = MIMEText(cuerpo)
    msg['Subject'] = 'Contacto desde página web'
    msg['From'] = SMTP_USER
    msg['To'] = DESTINO

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, DESTINO, msg.as_string())
        server.quit()
        return jsonify({"message": "Mensaje enviado con éxito!"})
    except Exception as e:
        return jsonify({"error": f"Error al enviar el mensaje: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
