


const canvas = document.getElementById("earthCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 350;

const earth = new Image();
earth.src = "earth.png"; // your real Earth texture

let rotation = 0;

earth.onload = () => {
    animate();
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const size = 300; 
    const radius = size / 2;

    rotation += 0.003; // rotation speed

    // draw rotating Earth
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);
    ctx.drawImage(earth, -radius, -radius, size, size);
    ctx.restore();

    requestAnimationFrame(animate);
}

