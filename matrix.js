const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01";
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);

let drops = new Array(columns).fill(1);

// mouse
let mouse = {
    x: -1000,
    y: -1000
};

// trail (ultimele poziții)
let trail = [];

document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    trail.push({ x: mouse.x, y: mouse.y });
    if (trail.length > 10) trail.shift();
});

// shockwave la click
let pulses = [];

document.addEventListener("click", (e) => {
    pulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0
    });
});

function draw() {
    ctx.fillStyle = "rgba(13, 17, 23, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        let x = i * fontSize;
        let y = drops[i] * fontSize;

        const text = letters[Math.floor(Math.random() * letters.length)];

        let intensity = 0;

        // 🔹 mouse influence
        let dx = x - mouse.x;
        let dy = y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
            intensity += (120 - dist) / 120;
        }

        // 🔹 trail influence
        for (let t of trail) {
            let dx2 = x - t.x;
            let dy2 = y - t.y;
            let d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            if (d2 < 80) {
                intensity += (80 - d2) / 80 * 0.5;
            }
        }

        // 🔹 pulses (shockwave)
        for (let p of pulses) {
            let dx3 = x - p.x;
            let dy3 = y - p.y;
            let d3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

            if (Math.abs(d3 - p.radius) < 20) {
                intensity += 1;
            }
        }

        // culoare dinamică
        if (intensity > 1) intensity = 1;

        let green = Math.floor(80 + intensity * 175);
        let blue = Math.floor(intensity * 150);

        ctx.fillStyle = `rgb(0, ${green}, ${blue})`;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    // update pulses
    for (let i = 0; i < pulses.length; i++) {
        pulses[i].radius += 5;

        if (pulses[i].radius > 300) {
            pulses.splice(i, 1);
            i--;
        }
    }
}

setInterval(draw, 33);

// resize fix
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(1);
});