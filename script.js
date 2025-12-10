const questions = [
    {
        q: "How many single-use plastics did you avoid today?",
        options: [
            { text: "0", value: 0 },
            { text: "1–2", value: 10 },
            { text: "3–5", value: 20 },
            { text: "More than 5", value: 30 }
        ]
    },
    {
        q: "Did you choose walking/cycling/public transport instead of a car?",
        options: [
            { text: "No", value: 0 },
            { text: "Partially", value: 15 },
            { text: "Yes", value: 25 }
        ]
    },
    {
        q: "How much water did you consciously save today?",
        options: [
            { text: "Less than 2 liters", value: 5 },
            { text: "2–5 liters", value: 15 },
            { text: "5–10 liters", value: 20 },
            { text: "10+ liters", value: 25 }
        ]
    },
    {
        q: "Did you practice eco-friendly consumption today?",
        options: [
            { text: "Not today", value: 0 },
            { text: "A little", value: 10 },
            { text: "Yes, actively", value: 20 }
        ]
    },
    {
        q: "Did you reduce electricity usage by turning off unused devices?",
        options: [
            { text: "No", value: 0 },
            { text: "A bit", value: 10 },
            { text: "Yes actively", value: 20 }
        ]
    }
];

let current = 0;
let totalScore = 0;

const questionArea = document.getElementById("question-area");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const scoreText = document.getElementById("score");

nextBtn.addEventListener("click", () => {
    if (nextBtn.textContent === "Start") {
        loadQuestion();
        nextBtn.style.display = "none";
    }
});

function loadQuestion() {
    if (current >= questions.length) {
        finishGame();
        return;
    }

    let q = questions[current];

    questionArea.innerHTML = `
        <div class="card">
            <h2>${q.q}</h2>
            ${q.options
                .map((o, i) => `<div class='option' onclick='chooseOption(${o.value})'>${o.text}</div>`)
                .join("")}
        </div>
    `;
}

function chooseOption(value) {
    totalScore += value;
    current++;
    loadQuestion();
}

function finishGame() {
    let percent = Math.min(Math.round((totalScore / 120) * 100), 100);

    questionArea.innerHTML = `
        <h1>🎉 Journey Complete!</h1>
        <p>Your daily Eco Score</p>
    `;

    progress.style.width = percent + "%";
    scoreText.textContent = percent + "%";

    nextBtn.style.display = "block";
    nextBtn.textContent = "Play Again";

    nextBtn.onclick = () => {
        location.reload();
    };
}






/* ========== GLOBAL: Quiz + UI logic ========== */

/* -- QUIZ QUESTIONS (5) -- */
const questions = [
  {
    q: "How many single-use plastics did you avoid today?",
    options: [
      { text: "0", value: 0 },
      { text: "1–2", value: 10 },
      { text: "3–5", value: 20 },
      { text: "More than 5", value: 30 }
    ]
  },
  {
    q: "Did you choose walking/cycling/public transport instead of a car?",
    options: [
      { text: "No", value: 0 },
      { text: "Partially", value: 15 },
      { text: "Yes", value: 25 }
    ]
  },
  {
    q: "How much water did you consciously save today?",
    options: [
      { text: "Less than 2 liters", value: 5 },
      { text: "2–5 liters", value: 15 },
      { text: "5–10 liters", value: 20 },
      { text: "10+ liters", value: 25 }
    ]
  },
  {
    q: "Did you practice eco-friendly consumption today?",
    options: [
      { text: "Not today", value: 0 },
      { text: "A little", value: 10 },
      { text: "Yes, actively", value: 20 }
    ]
  },
  {
    q: "Did you reduce electricity usage by turning off unused devices?",
    options: [
      { text: "No", value: 0 },
      { text: "A bit", value: 10 },
      { text: "Yes actively", value: 20 }
    ]
  }
];

/* BASIC STATE */
let current = 0;
let totalScore = 0;

/* DOM */
const questionArea = document.getElementById("question-area");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const scoreText = document.getElementById("score");
const startQuizBtn = document.getElementById("start-quiz");

/* START QUIZ button behavior: scroll to quiz and show first Q */
startQuizBtn.addEventListener("click", () => {
  document.querySelector("#quiz").scrollIntoView({ behavior: "smooth" });
  // small delay then start
  setTimeout(() => {
    nextBtn.style.display = "inline-block";
    nextBtn.textContent = "Start";
  }, 420);
});

/* Next button (Start / Play Again behavior) */
nextBtn.addEventListener("click", () => {
  if (nextBtn.textContent === "Start") {
    loadQuestion();
    nextBtn.style.display = "none";
  }
});

/* LOAD QUESTION */
function loadQuestion() {
  if (current >= questions.length) {
    finishGame();
    return;
  }

  let q = questions[current];

  questionArea.innerHTML = `
    <div class="card">
      <h3 style="color:var(--neon-blue)">${q.q}</h3>
      <div class="options">
        ${q.options.map((o, i) => `<div class="option" data-val="${o.value}">${o.text}</div>`).join("")}
      </div>
    </div>
  `;

  // attach handlers
  document.querySelectorAll(".option").forEach(opt => {
    opt.addEventListener("click", () => {
      chooseOption(Number(opt.getAttribute("data-val")));
    });
  });
}

/* OPTION CHOSEN */
function chooseOption(value) {
  totalScore += value;
  current++;
  loadQuestion();
}

/* FINISH */
function finishGame() {
  const maxPossible = 30 + 25 + 25 + 20 + 20; // max totals by our config
  let percent = Math.min(Math.round((totalScore / maxPossible) * 100), 100);

  questionArea.innerHTML = `
    <div style="text-align:center">
      <h2 style="color:var(--neon-green)">🎉 Journey Complete!</h2>
      <p>Your Eco Score</p>
      <div style="margin-top:14px;">
        <div class="progress-bar" style="width:320px;"><div id="final-progress" style="height:12px;border-radius:999px;background:linear-gradient(90deg,var(--neon-blue),var(--neon-green));width:0%;transition:width 800ms ease;"></div></div>
      </div>
      <h3 style="margin-top:12px;color:#bdeccf">${percent}%</h3>
      <p style="color:#9fbfb1">Tip: small changes add up. Try a micro-challenge below!</p>
    </div>
  `;

  // animate final progress
  setTimeout(() => {
    const finalProgress = document.getElementById("final-progress");
    if (finalProgress) finalProgress.style.width = percent + "%";
  }, 80);

  // update top bar and replay
  progress.style.width = percent + "%";
  scoreText.textContent = percent + "%";

  nextBtn.style.display = "inline-block";
  nextBtn.textContent = "Play Again";
  nextBtn.onclick = () => location.reload();
}

/* ========== SIMPLE PLAY / PLEDGE UI ========== */
const challenges = [
  "Skip one single-use plastic today",
  "Take a 10-minute walk instead of a short drive",
  "Unplug charger when not in use for 1 hour",
  "Have one plant-based meal today",
  "Shorten shower by 1 minute"
];

document.getElementById("generate-challenge").addEventListener("click", () => {
  const pick = challenges[Math.floor(Math.random()*challenges.length)];
  document.getElementById("challenge-output").textContent = "➤ " + pick;
});

document.getElementById("pledge-btn").addEventListener("click", () => {
  const val = document.getElementById("pledge-input").value.trim();
  if (!val) return alert("Please write a short pledge.");
  const node = document.createElement("div");
  node.textContent = "• " + val;
  node.style.marginTop = "8px";
  document.getElementById("pledge-list").prepend(node);
  document.getElementById("pledge-input").value = "";
});

/* ========== THREE.JS — Neon wireframe globe (dual-tone) ========== */
(function initGlobe(){
  // Basic safety: if WebGL unavailable, skip gracefully
  if (!window.THREE) {
    console.warn("Three.js not loaded — globe disabled.");
    return;
  }

  const canvas = document.getElementById("globe");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);
  renderer.setClearColor(0x000000, 0); // transparent

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 6);

  // resize handling
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize, { passive:true });

  // ambient glow point
  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambient);

  // directional for subtle shading
  const dir = new THREE.DirectionalLight(0xffffff, 0.25);
  dir.position.set(5, 3, 5);
  scene.add(dir);

  // create a wireframe sphere
  const radius = 1.8;
  const widthSeg = 64;
  const heightSeg = 64;

  const sphereGeom = new THREE.SphereBufferGeometry(radius, widthSeg, heightSeg);

  // Create a wireframe from geometry edges
  const edges = new THREE.WireframeGeometry(sphereGeom);

  // two-layer dual tone: inner thinner wire + outer glow
  const wireMaterial = new THREE.LineBasicMaterial({ color: 0x00d2ff, linewidth: 1, transparent: true, opacity: 0.85 });
  const wire = new THREE.LineSegments(edges, wireMaterial);
  wire.rotation.z = 0.2;
  scene.add(wire);

  // second slightly scaled wire with green for dual-tone shimmer
  const wireMaterial2 = new THREE.LineBasicMaterial({ color: 0x39ff7a, linewidth: 1, transparent: true, opacity: 0.6 });
  const wire2 = new THREE.LineSegments(edges, wireMaterial2);
  wire2.scale.set(1.01, 1.01, 1.01);
  wire2.rotation.y = 0.4;
  scene.add(wire2);

  // soft neon halo using a transparent sprite
  const spriteMap = new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/nfroidure/threejs-samples@master/images/glow.png');
  const spriteMat = new THREE.SpriteMaterial({ map: spriteMap, color: 0x33ffb0, transparent: true, opacity: 0.08 });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(8,8,1);
  scene.add(sprite);

  // subtle rotation animation with slight mouse parallax
  let targetX = 0, targetY = 0;
  const onMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    targetX = (x) * 0.6;
    targetY = (y) * 0.3;
  };
  window.addEventListener("mousemove", onMouseMove, { passive:true });

  // animation loop
  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();

    // base slow rotation
    wire.rotation.y = t * 0.15 + targetX * 0.2;
    wire.rotation.x = Math.sin(t * 0.12) * 0.08 + targetY * 0.1;

    wire2.rotation.y = -t * 0.18 + targetX * 0.12;
    wire2.rotation.x = Math.cos(t * 0.07) * 0.05 + targetY * 0.07;

    // tiny pulsing
    const pulse = 1 + Math.sin(t * 0.9) * 0.005;
    sprite.scale.set(8 * pulse, 8 * pulse, 1);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  // initial resize
  resize();

  // graceful fallback: if WebGL context lost or unsupported, hide canvas
  function webglCheck(){
    try {
      const gl = renderer.getContext();
      if(!gl) throw 0;
    } catch(e){
      canvas.style.display = "none";
    }
  }
  webglCheck();

})();
