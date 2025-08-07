document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const inputs = form.querySelectorAll('input, textarea');

  const errors = {
    nombre: document.createElement('span'),
    email: document.createElement('span'),
    mensaje: document.createElement('span'),
  };

  // Insertar spans de error al lado de cada input/textarea
  inputs.forEach(input => {
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    input.parentNode.insertBefore(errorSpan, input.nextSibling);
    errors[input.name] = errorSpan;
  });

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.remove('error');
        errors[input.name].textContent = '';
        errors[input.name].classList.remove('visible');
      } else {
        input.classList.add('error');
        errors[input.name].textContent = 'Este campo es obligatorio';
        errors[input.name].classList.add('visible');
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let valid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.classList.add('error');
        errors[input.name].textContent = 'Este campo es obligatorio';
        errors[input.name].classList.add('visible');
        valid = false;
      } else {
        input.classList.remove('error');
        errors[input.name].textContent = '';
        errors[input.name].classList.remove('visible');
      }
    });

    if (!valid) {
      Toastify({
        text: "Por favor completá todos los campos.",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "#dc3545",
        close: true
      }).showToast();
      return;
    }

    const data = {
      name: form.nombre.value,
      email: form.email.value,
      message: form.mensaje.value
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      Toastify({
        text: result.message || result.error,
        duration: 4000,
        close: true,
        gravity: "bottom",
        position: "center",
        backgroundColor: result.message ? "#04926fff" : "#dc3545",
      }).showToast();

      if (result.message) form.reset();

    } catch (err) {
      Toastify({
        text: "Error al enviar. Intente de nuevo.",
        duration: 4000,
        close: true,
        gravity: "bottom",
        position: "center",
        backgroundColor: "#dc3545",
      }).showToast();
    }
  });
});
