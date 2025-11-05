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
      const correctCount = draft.reduce(
        (sum, q) => sum + (q.isThatCorrect ? 1 : 0),
        0
      );
      setCorrectAnswers(correctCount);
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
    setCorrectAnswers(0);
    setAnswer((draft) => {
      draft.length = 0;
    });
    setShowResult(false);
  };

  return (
    <div className="h-screen w-screen bg-violet-600 flex justify-center items-center flex-col">
      {showResult ? (
        <>
          <div className="bg-green-600 p-5 rounded-lg my-2 font-bold text-white">{` ${correctAnswers} سوالو درست زدی مشتی ایولا`}</div>
          <button
            onClick={startOverQuiz}
            className="bg-red-500 p-2 rounded-lg text-white font-bold text-lg cursor-pointer hover:bg-red-600 hover:scale-110 duration-200"
          >
            شروع دوباره
          </button>
        </>
      ) : (
        <>
          {quiz.questions
            .filter((q) => q.id === questionNo)
            .map((q) => (
              <div
                key={q.id}
                className="bg-violet-400 text-violet-950 w-[20rem] h-60 p-4 shadow-2xl rounded-2xl"
              >
                {/* question */}
                <div className="text-center font-bold text-lg">{`${q.id}. ${q.question}`}</div>
                {/* answers */}
                <div>
                  {q.answers.map((a, index) => (
                    <div key={index} className="flex gap-1 py-1">
                      <input
                        type="radio"
                        checked={
                          answer.find((ans) => ans.id === q.id)?.value === a
                        }
                        id={a}
                        value={a}
                        name="question"
                        onChange={(e) => handleAnswer(q.id, e)}
                        className="accent-violet-950"
                      />
                      <label htmlFor={a} className="text-lg">
                        {a}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          <div className="flex gap-2 my-2">
            <button
              onClick={handlePreviousBtn}
              className="bg-violet-500 p-2 rounded-lg text-white font-bold text-lg cursor-pointer hover:bg-gray-700 hover:scale-110 duration-200"
              disabled={questionNo === 1}
            >
              قبل
            </button>
            <button
              onClick={handleNextBtn}
              className="bg-violet-500 p-2 rounded-lg text-white font-bold text-lg cursor-pointer hover:bg-gray-700 hover:scale-110 duration-200"
              disabled={questionNo === 5}
            >
              بعد
            </button>
            {answer.length === 5 && (
              <button
                className="bg-green-500 p-2 rounded-lg text-white font-bold text-lg cursor-pointer hover:bg-green-600 hover:scale-110 duration-200"
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
