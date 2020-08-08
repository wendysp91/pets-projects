const email = document.getElementById('email');
const aasunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const enviar = document.getElementById('enviar');
const reset = document.getElementById('resetBtn');
const formulario = document.getElementById('enviar-mail');

document.addEventListener('DOMContentLoaded', iniciarApp);
email.addEventListener('blur', validarCampos);
aasunto.addEventListener('blur', validarCampos);
mensaje.addEventListener('blur', validarCampos);
enviar.addEventListener('click', enviarEmail);
reset.addEventListener('click', resetCampos);


function iniciarApp() {
    enviar.disabled = true;
}

function validarCampos() {
    validarLongitud(this);

    if (this.type === 'email') {
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error')
    if (email.value !== '' && aasunto.value !== '' && mensaje.value !== '') {
        if (errores.length === 0) {
            enviar.disabled = false;
        }

    }
}

function validarLongitud(campo) {
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail(campo) {
    const correo = campo.value;
    if (correo.indexOf('@') !== -1) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function enviarEmail(e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    const gifEnviado = document.createElement('img');
    gifEnviado.src = 'img/mail.gif';
    gifEnviado.style.display = 'block';

    setTimeout(function () {
        spinner.style.display = 'none';
        document.querySelector('#loaders').appendChild(gifEnviado);

        setTimeout(function () {
            gifEnviado.remove();
            formulario.reset();
        }, 5000);
    }, 3000);

}

function resetCampos() {
    formulario.reset();
}