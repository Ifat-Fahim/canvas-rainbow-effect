const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const particlesArray = [];
let hue = 0;

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 50; i++) {
        particlesArray.push(new Particle());
    }
});

canvas.addEventListener("click", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    // creating 20 particles in every click in canvas
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
});

class Particle {
    constructor() {
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        // setting up a different color for each particle
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // decreasing the particle size if their size is greater than 0.2 px
        if (this.size > 0.2) {
            return (this.size -= 0.1);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// function init() {
//     for (let i = 0; i < 100; i++) {
//         particlesArray.push(new Particle());
//     }
// }

// init();

function handleParticle() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // removing the parcles from the particlesArray if their size is less than 0.3

        // for (let j = i; j < particlesArray.length; j++) {
        //     const dx = particlesArray[i].x - particlesArray[j].x;
        //     const dy = particlesArray[i].y - particlesArray[j].x;
        //     const distance = Math.sqrt(dx * dx + dy * dy);
        //     if (distance < 100) {
        //         ctx.beginPath();
        //         ctx.strokeStyle = particlesArray[i].color;
        //         ctx.lineWidth = particlesArray[i].size / 3;
        //         ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        //         ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        //         ctx.stroke();
        //     }
        // }

        if (particlesArray[i] <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }

        // User's Experience can be tolerated if particles are more than 2000. So, if Particle's size is less than .21 and the number of particles are more than 2000, Some small particles will be spliced from the array and the new one will take place of them. The effect remains the same.
        if (particlesArray[i].size < 0.21) {
            if (particlesArray.length > 2000) {
                particlesArray.splice(i, 1);
            }
        }
    }
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // This is for particle trail effect
    ctx.fillStyle = `rgba(0, 0, 0,0.5)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue += 3;
    console.log(particlesArray.length);
    requestAnimationFrame(animate);
}
animate();
