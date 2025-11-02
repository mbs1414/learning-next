"use client";
import { useState } from "react";
import { quiz } from "../data";

const Quiz = () => {
  const [questionNo, setQuestionNo] = useState(1);
  const handleNextBtn = () => {
    setQuestionNo((prev) => prev + 1);
  };
  const handlePreviousBtn = () => {
    setQuestionNo((prev) => prev - 1);
  };

  return (
    <div className="h-screen w-screen bg-violet-600">
      {quiz.questions
        .filter((q) => q.id === questionNo)
        .map((q) => (
          <div key={q.id}>
            {/* question */}
            <div>{`${q.id}. ${q.question}`}</div>
            {/* answers */}
            <div>
              {q.answers.map((a, index) => (
                <div key={index}>
                  <input type="radio" id={a} value={a} name="question" />
                  <label htmlFor={a}>{a}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      <div>
        <button onClick={handlePreviousBtn} disabled={questionNo === 1}>
          قبل
        </button>
        <button onClick={handleNextBtn} disabled={questionNo === 5}>
          بعد
        </button>
      </div>
    </div>
  );
};

export default Quiz;
