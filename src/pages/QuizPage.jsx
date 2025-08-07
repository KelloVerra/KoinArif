import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getQuizById } from '../glob/quizes'
import { generateQuiz } from '../glob/state';

// import './Quiz.css'

// Components
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'

export default function Quiz() {

  // TODO: navigate to landing if user hasnt started
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizState = useSelector(state => state.quiz.value)

  // TODO: change quiz data formatting
  const [receivedQuizData, setReceivedQuizData] = useState(getQuizById(quizState.generatedQuizes[quizState.currentGeneratedQuizIndex]));

  // update quzi data
  useEffect(_ => {
    const quizId = quizState.generatedQuizes[quizState.currentGeneratedQuizIndex];
    const quizData = getQuizById(quizId);
    
    if (quizData.error)
      console.log(`error while obtaining quiz id of ${quizId || 'undefined'}`)

    setReceivedQuizData(quizData);
  }, [quizState]);



  return (
    <>
      {receivedQuizData.element}
    </>
  )
}
