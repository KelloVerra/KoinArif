import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { buildQuizId, getQuizById } from '../glob/quizes'
import { advanceQuiz, completeQuiz, generateQuiz, resetQuiz } from '../glob/state';

// import './QuizPage.css'

// Components
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'


export default function QuizPage() {

  // TODO: navigate to landing if user hasnt started
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const quizState = useSelector(stat => stat.quiz.value);

  // TODO: change quiz data formatting
  const [receivedQuizData, setReceivedQuizData] = useState(getQuizById(quizState.generatedQuizes[quizState.currentGeneratedQuizIndex]));

  // quiz logic
  useEffect(_ => {

    const qIndex = quizState.currentGeneratedQuizIndex;
    const genQuizData = quizState.generatedQuizes[qIndex];
    const quizExtraData = genQuizData.data;
    const quizId = buildQuizId(genQuizData.materialId, genQuizData.quizVariant);

    const processedQuizData = getQuizById(quizId);
    
    if (processedQuizData.error)
      console.log(`error while obtaining quiz id of ${quizId || 'undefined'}`)

    setReceivedQuizData(processedQuizData);
  }, [quizState]);


  // TODO: Answer options
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
        <Quiz index={quizState.currentGeneratedQuizIndex} quizData={receivedQuizData} onNextQuestion={nextQuestion} />
      }
    </>
  )
}

function Quiz({index, quizData, onNextQuestion}) {
  return (<>
      <h1>Q. {index+1}</h1>
        {quizData.element}
      <button onClick={_ => onNextQuestion()}>Next</button>
  </>);
}

function Finish({onConfirmEnd}) {
  return (<>
      <h1>yey menank</h1>
      <button onClick={_ => onConfirmEnd()}>Balik</button>
  </>);
}