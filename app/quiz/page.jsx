"use client";
import { useEffect, useState } from "react";
import { quiz } from "../data";
import { useImmer } from "use-immer";

const Quiz = () => {
  const [questionNo, setQuestionNo] = useState(1);
  const [answer, setAnswer] = useImmer([]);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useImmer(0);
  const handleAnswer = (id, event) => {
    setAnswer((draft) => {
      const question = draft.find((a) => a.id === id);
      if (question) {
        question.value = event.target.value;
        question.isThatCorrect =
          question.value ===
          quiz.questions.find((a) => a.id === id).correctAnswer;
      } else {
        draft.push({
          id: id,
          value: event.target.value,
          isThatCorrect:
            event.target.value ===
            quiz.questions.find((a) => a.id === id).correctAnswer,
        });
      }
    });
  };
  const handleNextBtn = () => {
    setQuestionNo((prev) => prev + 1);
  };
  const handlePreviousBtn = () => {
    setQuestionNo((prev) => prev - 1);
  };
  const startOverQuiz = () => {
    setQuestionNo(1);
    setAnswer((draft) => {
      draft.length = 0;
    });
    setShowResult(false);
  };
  useEffect(() => {
    console.log(answer);
    
    // const result = answer.map(
    //   (a, index) => a.value === quiz.questions[index].correctAnswer
    // );
    // setCorrectAnswers(result.reduce((sum, val) => sum + (val ? 1 : 0), 0));
    // console.log(result);
  },);

  return (
    <div className="h-screen w-screen bg-violet-600">
      {showResult ? (
        <>
          <div>{correctAnswers}</div>
          <button onClick={startOverQuiz}>شروع دوباره</button>
        </>
      ) : (
        <>
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
                        checked={
                          answer.find((ans) => ans.id === q.id)?.value === a
                        }
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
            {answer.length === 5 && (
              <button
                onClick={() => {
                  setShowResult(true);
                }}
              >
                دیدن نتایج
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
