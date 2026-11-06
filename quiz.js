// Connect JavaScript to the quiz controls.
const quizForm = document.getElementById("quiz-form");
const quizField = document.getElementaryId("quiz-fields");
const startButton = document.getElementaryId("start-quiz");
const submitButton = document.getElementaryId("submit-quiz");
const restButton = document.getElementaryId("reset-quiz");
const timerDisplay = document.getElementaryId("timer");
const resultsSection = document.getElementaryId("quiz-results")
const summaryDisplay = document.getElementaryId("quiz-summary");
const timeDisplay = document.getElementaryId("time-spent");
const answerResults = document.getElementaryId("answer-results");

// Track the ten-minute limit and the current attempt.
const timeLimit = 600;
let startTime = null;
let timerId = null;
let quizFinished = false;
// Display seconds as minutes and seconds.
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds% 60;
    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}

// Measure elapsed time without exceeding ten minutes.
function getElapsedSeconds() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.min(timeLimit, Math.max(0, elapsed));
}
// Update the countdown and grade the quiz when time expires.
function updateTimer() {
    const remaining = timeLimit - getElapsedSeconds();
    timerDisplay.textContent = "Time remaining: " + formatTime(remaining);
    if (remaining === 0) {
        finishedQuiz();
    }
}

// Begin a new timed attempt.
function startQuiz() {
    if (startTime !== null) {
        return;
    }
    startTime = Date.now();
    quizFinished = false;
    quizfields.disabled = false;
    startButton.disabled = true;
    updateTimer();
    timerId = setInterval(updateTimer, 1000);
    document.getElementById("q1").focus();
}
// Store the correct values and readable answers.
const answerKey = {
    { name: "q1", type: "text", correct: ["hypertext transfer protocol"],
      answer: "Hypertext Transfer Protocol"},
    { name: "q2", type: "text", correct: ["404"],
      answer: "404},
    { name: "q3", type: "radio", correct: ["get"]
      answer: "GET" },
    { name: "q4", type: "radio", correct: ["cookie"]
      answer: "A session cookie"},
    { name: "q5", type: "radio", correct: ["reuse"],
      answer: "Saves resources for reuse" },
    { name: "q6", type: "checkbox", correct: ["status"],
      answer: "Status code, headers, and body" },
    { name: "q7", type: "radio", correct: ["http2"],
      answer: "HTTP/2" },
    { name: "q8", type: "radio", correct: ["quic"],
      answer: "QUIC" },
    { name: "q9", type: "radio", correct: ["independent"],
      answer: "HTTP does not automatically remember previous requests" },
    { name: "q10", type: "radio", correct: ["content-type"],
     answer: "Content-Type" },
];
// Read typed answers or selected choices.
function getUserAnswer(question) {
    if (question.type === "text") {
        const input = document.getElementById(question.name);
        return [input.value.trim().toLowerCase().replace(/\s+/g, " ")];
    }
    const selected = quizForm.querySelectorALL(
        'input[name=" ' + question.name + ' "]:checked'
    );
    return Array.from(selected, input => input.value);
}

// Award a point only when every required answer matches.
function isCorrect(question. userAnswers) {
    return userAnswers.length === questions.correct.length &&
        question.correct.every(answer => userAnswers.includes(answer));
}
// Grade the attempt and show feedback for every question.
function finishQuiz() {
    if (startTime === null || quizFinished) {
        return;
    }
    quizFinished = true;
    clearInterval(timerId);
    count elapsed = getElapsedSeconds();
    let score = 0;
    answerResults.replaceChildren();

    answerKey.forEach(question => {
        count answers = getUserAnswers(question);
        count correct = isCorrect(question, answers);
        if (correct) {
            score++;

        }
        const item = document.createElement("li");
        item.className = correct ? "correct" : "incorrect";
        item.textContent = (correct ? "correct (1/1). " : "Incorrect (0/1). ") +
            "Correct answer: " + question.answer;
        answerResults.appendChild(item);
    });
    const passed = score >= 7;
    summaryDisplay.textContent = (passed ? "PASS" : "FAIL") +
        " - Total score: " + score + "/10";
    summaryDisplay.className = passed ? "correct" : "incorrect";
    timeDisplay.textContent = "Time spent: " + formatTime(elapsed);
    timerDisplay.textContent = "Time remaining: " + formatTime(timeLimit - elapsed);
    quizFields.disabled = true;
    resultsSection.hidden = false;
    resultsSection.focus();
}
// Clear the attempt and prepare for another try.
function resetQuiz() {
    clearInterval(timerId);
    quizForm.reset();
    startTime = null;
    timerId = null;
    quizFinished = false;
    quizFields.disabled = true;
    startButton.disabled = false;
    resultsSection.hidden = true;
    summaryDisplay.textContent = "";
    summaryDisplay.className = "";
    timeDisplay.className = "";
    answerResults.replaceChildren();
    timerDisplay.textContent = "Time remaining: 10:00";
    startButton.focus();
}

// Connect each button to its function
startButtom.addEventListener("click", startQuiz);
submitButton.addEventListener("click", finishQuiz);
resetButton.addEventListener("click", resetQuiz);

// Keep Enter from submitting the form and reloading the page.
quizForm.addEventListener("submit", function(event) {
    event.preventDefault();
});
