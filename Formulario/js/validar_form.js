const formulario = document.querySelector('#formulario');

function validarCampos() {
    let nombre = document.querySelector('#nombre').value;
    let apellido = document.querySelector('#apellido').value;
    let edad = document.querySelector('#edad').value;
    let email = document.querySelector('#email').value;
    let contraseña = document.querySelector('#contraseña').value;
    let foto = document.querySelector('#foto').value;

    let extension = foto.substring(foto.lastIndexOf('.'), foto.length);
    // let puebacontraseña = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/i
    let pruebaEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let soloPalabras = /^[a-z\s]+$/i;
    let datosValidos = true;
    let msjerror = 'datos inválidos: ';
    
    if (nombre === '' || !soloPalabras.test(nombre)){
        datosValidos = false;
        msjerror += ' nombre';
    }

    if (apellido === '' || !soloPalabras.test(apellido)){
        datosValidos = false;
        msjerror += ' apellido';
    }
    
    if (edad === '' || !Number.isInteger(Number(edad))){
        datosValidos = false;
        msjerror += ' edad';
    }
    
    if(email === '' || !pruebaEmail.test(email)){
        datosValidos = false;
        msjerror += ' email'
    }

    if(contraseña === ''){
        datosValidos = false;
        msjerror += ' contraseña'
    }

    if(foto != '' && document.getElementById('foto').getAttribute('accept').split(',').indexOf(extension) < 0){
        datosValidos = false;
        msjerror += ' Formato de imagen invalido'
    }


    let mensaje = document.querySelector('#rtaForm');
    if (datosValidos){
        mensaje.innerHTML = 'datos ingresados correctamente'
    } else {
        mensaje.innerHTML = msjerror
    }
}

function enviarDatosBackend(nombre, apellido, edad, email, contraseña) {
    let datosUsuario = {
        nombre: nombre,
        apellido: apellido,
        edad: parseInt(edad),
        email: email,
        contraseña: contraseña,
    };

    fetch('https://mtelopez.pythonanywhere.com/api-pc/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ datos: datosUsuario })  
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud HTTP: ' + response.status);
        }
        return response.json();  
    })
    .catch(error => {
        console.error('Error al enviar datos al backend:', error);
        
    });
}

formulario.addEventListener('submit', evento => {

    validarCampos();

    let nombre = document.querySelector('#nombre').value;
    let apellido = document.querySelector('#apellido').value;
    let edad = document.querySelector('#edad').value;
    let email = document.querySelector('#email').value;
    let contraseña = document.querySelector('#contraseña').value;

    enviarDatosBackend(nombre, apellido, edad, email, contraseña);

    evento.preventDefault();
 });