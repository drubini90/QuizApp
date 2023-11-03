import { useRef } from 'react';
import QUESTIONS from '../questions.js';

export default function Answers({
  index,
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();
  let answerButtonStyle = "answer";

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = '';

        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }

        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
           cssClass = answerState;
        }else if(answerState != null && answerState != '' && QUESTIONS[index].answers[0] === answer){
          cssClass = 'highlightCorrect';
          answerButtonStyle = 'answer '
        }
        else{
          answerButtonStyle = 'answer';
        }

        return (
          <li key={answer} className={answerButtonStyle}>
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
