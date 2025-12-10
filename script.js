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

