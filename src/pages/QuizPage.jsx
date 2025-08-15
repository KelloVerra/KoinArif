import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getQuizFormatProcessorByFormatIndex, getQuizTemplateByIndex } from '../glob/quizes'
import { advanceQuiz, completeQuiz, generateQuiz, resetQuiz } from '../glob/state';

// import './QuizPage.css'


export default function QuizPage() {

  // TODO: navigate to landing if user hasnt started
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const quizState = useSelector(stat => stat.quiz.value);

  const currentQuiz = quizState.generatedQuizes[quizState.currentGeneratedQuizIndex];


  // TODO: Collect budget
  const nextQuestion = () => {
    dispatch(advanceQuiz())
    
    if (quizState.currentGeneratedQuizIndex >= quizState.generatedQuizes.length-1)
      dispatch(completeQuiz({}));
  };
  
  const confirmEnd = () => {
    navigate("/");
  };

  return (
    <>
      {
        quizState.quizCompletionRecapData.finished ?
        <Finish onConfirmEnd={confirmEnd} /> :
        <QuizInterface state={quizState} quiz={currentQuiz} onNextQuestion={nextQuestion} />
      }
    </>
  )
}

function QuizInterface({state, quiz, onNextQuestion}) {
  const selectQuizFormat = () => {
    switch (quiz.display_format) {
      case 0:
        return <MultipleChoiceQuestion data={quiz} onNextQuestion={onNextQuestion} />
      case 1:
        return <MatchingQuestion data={quiz} onNextQuestion={onNextQuestion} />;
    }
  }

  return (
    <>
      <h1>Q. {state.currentGeneratedQuizIndex+1}</h1>
      {selectQuizFormat()}
    </>
  );
}

function MultipleChoiceQuestion({data, onNextQuestion}) {
  const choose = ind => {
    const selOption = data.options[ind];
    const processor = getQuizFormatProcessorByFormatIndex(selOption.parent_format);
    console.log(processor.is_options_correct(selOption));
    onNextQuestion();
  }
  
  return (
    <>
      <h1>{data.question}</h1>
      <button onClick={_ => choose(0)}>{data.options[0].option} {data.options[0].desc} </button>
      <button onClick={_ => choose(1)}>{data.options[1].option} {data.options[1].desc} </button>
      <button onClick={_ => choose(2)}>{data.options[2].option} {data.options[2].desc} </button>
    </>
  );
}

function Finish({onConfirmEnd}) {
  return (<>
      <h1>yey menank</h1>
      <button onClick={_ => onConfirmEnd()}>Balik</button>
  </>);
}