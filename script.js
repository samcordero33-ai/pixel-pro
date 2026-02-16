// 1. Encender el fondo de estrellas
particlesJS("particles-js", {
  "particles": { "number": { "value": 120 }, "color": { "value": "#ffffff" }, "shape": { "type": "star" }, "size": { "value": 2, "random": true }, "move": { "enable": true, "speed": 1 } }
});

// 2. Función principal: Al tocar el botón
function consultarOraculo() {
    // Comprueba si el usuario ya hizo una lectura antes
    let yaConsulto = localStorage.getItem("lectura_realizada");

    if (yaConsulto === "si") {
        // Es su SEGUNDA vez -> Mostrar ventana de registro
        document.getElementById('ventana-registro').classList.remove('oculto');
    } else {
        // Es su PRIMERA vez -> Avanzar a las cartas y marcar como "leído"
        localStorage.setItem("lectura_realizada", "si");
        
        // Ocultar inicio, mostrar oráculo
        document.getElementById('pantalla-inicio').classList.add('oculto');
        document.getElementById('escena-oraculo').classList.remove('oculto');
        
        // Llamar a las 7 cartas
        invocarCartas();
    }
}

// 3. Crear las 7 cartas de la nada (de pequeño a grande)
function invocarCartas() {
    const mesa = document.getElementById('mesa-cartas');
    mesa.innerHTML = ""; // Limpiar mesa
    
    for (let i = 0; i < 7; i++) {
        let nuevaCarta = document.createElement('div');
        nuevaCarta.className = 'carta';
        // Hacemos que aparezcan una tras otra con un pequeño retraso
        nuevaCarta.style.animationDelay = (i * 0.3) + "s"; 
        mesa.appendChild(nuevaCarta);
    }
}

// 4. Función para cerrar la ventana de registro si no quiere
function cerrarRegistro() {
    document.getElementById('ventana-registro').classList.add('oculto');
}

