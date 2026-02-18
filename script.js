// --- LÓGICA DEL POLVO ESTELAR PARA LA FRASE ---
const canvas = document.getElementById('canvas-texto');
const ctx = canvas.getContext('2d');

canvas.width = 800; // Un poco más ancho para que quepa bien la frase
canvas.height = 200;

let partículas = [];
const frase = "El destino no es azar, es elección";

class Particula {
    constructor(x, y) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.destX = x;
        this.destY = y;
        this.color = "white"; 
        this.size = Math.random() * 2 + 0.5;
        this.velocidad = Math.random() * 0.05 + 0.02;
    }
    dibujar() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    actualizar(reconstruir) {
        if (reconstruir) {
            this.x += (this.destX - this.x) * this.velocidad;
            this.y += (this.destY - this.y) * this.velocidad;
        } else {
            this.x += (Math.random() - 0.5) * 4;
            this.y += (Math.random() - 0.5) * 4;
        }
    }
}

function initFrase() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Georgia'; // Tipo de letra más elegante
    ctx.textAlign = 'center';
    ctx.fillText(frase, canvas.width / 2, canvas.height / 2);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
            const index = (y * canvas.width + x) * 4;
            if (data[index + 3] > 128) {
                partículas.push(new Particula(x, y));
            }
        }
    }
}

let formandoFrase = true;
initFrase();

function animarPolvo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    partículas.forEach(p => {
        p.actualizar(formandoFrase);
        p.dibujar();
    });
    requestAnimationFrame(animarPolvo);
}

// Cambia de estado cada 5 segundos (se desintegra / se forma)
setInterval(() => {
    formandoFrase = !formandoFrase;
}, 5000);

animarPolvo();
