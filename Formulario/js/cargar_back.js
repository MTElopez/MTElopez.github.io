const origenJuegos = 'https://mtelopez.pythonanywhere.com/api-pc/juegos';
const origenImagenes = 'https://mtelopez.pythonanywhere.com/api-pc/imagen';

window.addEventListener('DOMContentLoaded', () => {
    console.log('Se cargó la página');

    Promise.all([
        cargarDatos(origenJuegos),
        cargarDatos(origenImagenes)
    ]).then(([juegos, imagenes]) => {
        mostrarDatos(juegos, imagenes);
    })
});

async function cargarDatos(url) {
    const respuesta = await fetch(url);
    return respuesta.json();
}

function mostrarDatos(juegos, imagenes) {
    let seccionPrincipal = document.querySelector('main');

    // Crear las dos secciones principales
    let seccion1 = document.createElement('section');
    let seccion2 = document.createElement('section');

    // Agregar clases a las secciones
    seccion1.className = 'section1';
    seccion2.className = 'section2';

    // Dividir los juegos en dos partes
    let primerosTresJuegos = juegos.slice(0, 3);
    let ultimosTresJuegos = juegos.slice(3, 6);

    // Función auxiliar para crear los divs de juegos
    function crearDivJuego(juego) {
        let juegoDiv = document.createElement('div');
        juegoDiv.className = 'divjuego'
        
        // Crear título h2 para el nombre del juego
        let nombreJuego = document.createElement('h2');
        nombreJuego.textContent = juego.nombre;
        
        // Crear párrafo para la descripción del juego
        let descripcionJuego = document.createElement('p');
        descripcionJuego.textContent = juego.descripcion;
        
        // Encontrar la imagen correspondiente al juego
        let imagenJuego = imagenes.find(imagen => imagen.id_juego === juego.id);
        if (imagenJuego) {
            // Crear imagen
            let imagen = document.createElement('img');
            imagen.src = imagenJuego.url_imagen;
            imagen.alt = `Imagen del juego ${juego.id}`;
            
            // Añadir imagen al div del juego
            juegoDiv.appendChild(imagen);
        }
        
        // Añadir nombre y descripción al div del juego
        juegoDiv.appendChild(nombreJuego);
        juegoDiv.appendChild(descripcionJuego);

        return juegoDiv;
    }

    // Mostrar primeros tres juegos en la primera sección
    primerosTresJuegos.forEach(juego => {
        let juegoDiv = crearDivJuego(juego);
        seccion1.appendChild(juegoDiv);
    });

    // Mostrar últimos tres juegos en la segunda sección
    ultimosTresJuegos.forEach(juego => {
        let juegoDiv = crearDivJuego(juego);
        seccion2.appendChild(juegoDiv);
    });

    // Agregar las dos secciones al main
    seccionPrincipal.appendChild(seccion1);
    seccionPrincipal.appendChild(seccion2);
}

// const origenJuegos = 'https://mtelopez.pythonanywhere.com/api-pc/juegos';
// const origenImagenes = 'https://mtelopez.pythonanywhere.com/api-pc/imagen';

// window.addEventListener('DOMContentLoaded', () => {
//     console.log('Se cargó la página');

//     Promise.all([
//         cargarDatos(origenJuegos),
//         cargarDatos(origenImagenes)
//     ]).then(([juegos, imagenes]) => {
//         mostrarDatos(juegos, imagenes);
//     })
// });

// async function cargarDatos(url) {
//     const respuesta = await fetch(url);
//     return respuesta.json();
// }

// function mostrarDatos(juegos, imagenes) {
//     let seccionJuegos = document.querySelector('.section2');

//     juegos.forEach(juego => {
//         let juegoDiv = document.createElement('div');
//         juegoDiv.className = 'divjuego'
        
//         // Crear título h2 para el nombre del juego
//         let nombreJuego = document.createElement('h2');
//         nombreJuego.textContent = juego.nombre;
        
//         // Crear párrafo para la descripción del juego
//         let descripcionJuego = document.createElement('p');
//         descripcionJuego.textContent = juego.descripcion;
        
//         // Encontrar la imagen correspondiente al juego
//         let imagenJuego = imagenes.find(imagen => imagen.id_juego === juego.id);
//         if (imagenJuego) {
//             // Crear imagen
//             let imagen = document.createElement('img');
//             imagen.src = imagenJuego.url_imagen;
//             imagen.alt = `Imagen del juego ${juego.id}`;
            
//             // Añadir imagen al div del juego
//             juegoDiv.appendChild(imagen);
//         }
        
//         // Añadir nombre y descripción al div del juego
//         juegoDiv.appendChild(nombreJuego);
//         juegoDiv.appendChild(descripcionJuego);

//         // Añadir div del juego a la sección de juegos
//         seccionJuegos.appendChild(juegoDiv);
//     });
// }