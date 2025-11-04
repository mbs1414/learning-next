"use client";
import { useState } from "react";
import { quiz } from "../data";
import { useImmer } from "use-immer";

const Quiz = () => {
  const [questionNo, setQuestionNo] = useState(1);
  const [answer, setAnswer] = useImmer([]);
const handleAnswer = (id, event) => {
  setAnswer((draft) => {
    const question = draft.find((a) => a.id === id);
    if (question) {
      question.value = event.target.value;
    } else {
      draft.push({ id: id, value: event.target.value });
    }
  });
};
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
                  <input
                    type="radio"
                    checked={answer.find((ans) => ans.id === q.id)?.value === a}
                    id={a}
                    value={a}
                    name="question"
                    onChange={(e) => handleAnswer(q.id, e)}
                  />
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
