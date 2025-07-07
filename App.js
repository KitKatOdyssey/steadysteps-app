import React, { useState } from "react";

const questions = [
  { id: "ill", question: "Are you feeling ill?", options: ["Not at all", "Just a bit", "Yes, very"] },
  { id: "tired", question: "How tired are you feeling?", options: ["Normal", "Pretty tired", "Very tired"] },
  { id: "freezey", question: "How freezey are you feeling?", options: ["Not at all", "Maybe a bit", "Already slowing down"] },
  { id: "anxious", question: "How anxious/stressed are you feeling?", options: ["Normal", "A bit", "Very"] },
  { id: "sad", question: "How sad/depressed are you feeling?", options: ["Normal", "A bit", "Very"] }
];

const activities = [
  "Stay inside, but bring a chair to an open window to enjoy the fresh air",
  "Do yoga inside",
  "Walk out into the back garden, and enjoy seeing the pond and any plants",
  "Do some light gardening outside",
  "Go for a 10-15 minute walk around the block",
  "Go for a half-hour local walk",
  "Go for a half-hour walk and include small Sainsbury's",
  "Go for a walk to the charity shop and the bigger shops",
  "Go for a walk to the river, then come straight back"
];

function App() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: parseInt(value) });
  };

  const handleSubmit = () => {
    const score = Object.values(answers).reduce((a, b) => a + b, 0);
    const index = Math.min(Math.floor((15 - score) / 2), activities.length - 1);
    setResult(activities[index]);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>SteadySteps: What Should I Do Today?</h1>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <label>{q.question}</label>
          <br />
          {q.options.map((opt, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name={q.id}
                value={idx + 1}
                checked={answers[q.id] === idx + 1}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} disabled={Object.keys(answers).length < 5}>
        Submit
      </button>
      {result && (
        <div style={{ marginTop: 30 }}>
          <h2>Recommended Activity:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;