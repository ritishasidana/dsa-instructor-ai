async function askQuestion() {
  const questionInput = document.getElementById("question");
  const answerEl = document.getElementById("answer");

  const question = questionInput.value.trim();

  if (!question) {
    answerEl.innerHTML = "<span style='color:red'>❌ Please enter a question.</span>";
    return;
  }

  answerEl.innerHTML = "⏳ Thinking...";

  try {
    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await res.json();

    answerEl.innerHTML = formatAnswer(data.answer);

  } catch (err) {
    answerEl.innerHTML = "<span style='color:red'>❌ Backend not reachable</span>";
  }
}

function formatAnswer(text) {
  if (!text) return "";

  return text
    // remove markdown headings ###
    .replace(/###\s?/g, "")

    // remove backticks `
    .replace(/`/g, "")

    // remove all *
    .replace(/\*/g, "")

    // make important headings bold
    .replace(/The Core Idea:/g, "<b>The Core Idea:</b>")
    .replace(/Prerequisites:/g, "<b>Prerequisites:</b>")
    .replace(/How it Works \(Step-by-Step\):/g, "<b>How it Works (Step-by-Step):</b>")
    .replace(/Instructor's Response/g, "<b>Instructor's Response</b>")

    // spacing
    .replace(/\n/g, "<br><br>");
}
