// ================= Gemini Config =================
const GEMINI_API_KEY = "AIzaSyAzjYYgY34YDbEQofAHYPsLycL2AUOd0OI";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// ================= Smooth Scrolling =================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ================= Scroll Animations =================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ================= ZenVeda AI Logic =================
const questionArea = document.getElementById("question-area");
const cameraSection = document.getElementById("camera-section");
const submitBtn = document.getElementById("submitAI");
const resultBox = document.getElementById("ai-result");

let selectedProblem = "";
let answers = {};
let imageBase64 = "";

// ================= Question Sets =================
const questionMap = {
    Digestion: ["What symptoms do you feel?", "Since when?", "How is your appetite?", "Spicy/oily food intake?"],
    Stress: ["What do you feel most?", "How is your sleep?", "Screen time?", "Physical activity level?"],
    Sleep: ["Difficulty in falling asleep?", "Wake up at night?", "Stress level?", "Caffeine intake?"],
    Skin: ["Main skin issue?", "Oily or dry skin?", "Since when?", "Any itching or redness?"],
    Joint: ["Pain location?", "Stiffness in morning?", "Swelling?", "Since when?"],
    Weight: ["Weight gain or loss?", "Appetite?", "Physical activity?", "Junk food intake?"],
    Wellness: ["Low energy?", "Immunity issues?", "Stress level?", "Sleep quality?"]
};

// ================= Problem Selection =================
document.querySelectorAll(".problem-card").forEach(btn => {
    btn.addEventListener("click", () => {
        selectedProblem = btn.dataset.problem;
        answers = {};
        questionArea.innerHTML = "";
        resultBox.innerHTML = "";
        submitBtn.style.display = "block";

        renderQuestions(selectedProblem);

        if (cameraSection) {
            if (selectedProblem === "Skin" || selectedProblem === "Joint") {
                cameraSection.style.display = "block";
            } else {
                cameraSection.style.display = "none";
            }
        }
    });
});

function renderQuestions(problem) {
    const qs = questionMap[problem];
    qs.forEach((q, i) => {
        const input = document.createElement("input");
        input.placeholder = q;
        input.oninput = (e) => answers[`q${i + 1}`] = e.target.value;
        questionArea.appendChild(input);
    });
}

// ================= Camera =================
const video = document.getElementById("camera");
const startBtn = document.getElementById("startCamera");
const captureBtn = document.getElementById("capture");
const canvas = document.getElementById("snapshot");

if (startBtn && video) {
    startBtn.onclick = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    };
}

if (captureBtn && canvas && video) {
    captureBtn.onclick = () => {
        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        imageBase64 = canvas.toDataURL("image/jpeg");
        alert("Image captured for analysis");
    };
}

// ================= Image Upload =================
const imageUpload = document.getElementById("imageUpload");
if (imageUpload) {
    imageUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            imageBase64 = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

// ================= Submit to Gemini AI =================
if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
        if (!selectedProblem) return alert("Please select a problem");

        resultBox.innerHTML = "🌿 ZenVeda is analyzing...";

        const prompt = `
You are ZenVeda, an Ayurvedic AI assistant.

User selected problem: ${selectedProblem}

User answers:
${JSON.stringify(answers, null, 2)}

Respond strictly in this format:

1. Dosha Imbalance:
2. Root Cause (Ayurvedic View):
3. Personalized Organic Diet:
4. Safe Herbal Guidance:
5. Yoga & Daily Routine:
6. When to Consult Doctor:

Be clear, direct and confident. Do not give multiple options.
`;

        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                resultBox.innerHTML = "⚠️ Gemini API Error. Check console.";
                return;
            }

            const aiText = data.candidates[0].content.parts[0].text;
            resultBox.innerHTML = aiText;

        } catch (error) {
            console.error("Gemini Error:", error);
            resultBox.innerHTML = "⚠️ Unable to connect to Gemini AI.";
        }
    });
}

// ================= Get Started Flow =================
const getStartedBtn = document.getElementById("getStartedBtn");
const aiSection = document.getElementById("ai-checkup");

if (getStartedBtn && aiSection) {
    getStartedBtn.addEventListener("click", function (e) {
        e.preventDefault();
        aiSection.style.display = "block";
        aiSection.scrollIntoView({ behavior: "smooth" });
    });
}
