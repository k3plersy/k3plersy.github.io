const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01";
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);

const drops = new Array(columns).fill(1);

let mouseX = -1000;
let mouseY = -1000;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function draw() {
    ctx.fillStyle = "rgba(13, 17, 23, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        let x = i * fontSize;
        let y = drops[i] * fontSize;

        const text = letters.charAt(Math.floor(Math.random() * letters.length));

        // distanță față de mouse
        let dx = x - mouseX;
        let dy = y - mouseY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        // dacă e aproape de mouse → highlight
        if (dist < 100) {
            ctx.fillStyle = "#00ff9f";
        } else {
            ctx.fillStyle = "#008f6a";
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 33);

// resize fix
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});