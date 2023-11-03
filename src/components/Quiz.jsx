import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [isNextButtonVisible, setNextButtonVisibility] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  

  console.log(`userAnswers :${userAnswers.length}`);
  const quizIsComplete = currentQuestionIndex === QUESTIONS.length;

  const handleCurrentQuestionIndex = () => {
    setCurrentQuestionIndex(userAnswers.length);
    setNextButtonVisibility(false);
  };


  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    console.log(`Updating the answer!`);
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
    setNextButtonVisibility(()=>{ return true});
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />
  }
  let nextButtonStyle = "hidden";
  if(isNextButtonVisible){
    nextButtonStyle = "btnImage";
  }

  return (
    <div className='wrapper'>
    {/* <div id="quiz">
      <Question
        key={currentQuestionIndex}
        index={currentQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div> */}
    <div className='left-component'>
    <div id="quiz">
    <Question
        key={currentQuestionIndex}
        index={currentQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
      </div>
    </div>
    <div className='right-component'>
      <img src='src/assets/next1.png' alt='next button' className={nextButtonStyle} onClick={handleCurrentQuestionIndex}></img>
    </div>
    {/* <div id="btndiv">
      <img src='src/assets/next1.png' alt='next button' className={nextButtonStyle} onClick={handleCurrentQuestionIndex}></img>
    </div> */}
    </div>
  );
}
