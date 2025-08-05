import { useEffect, useState } from 'react';
import { getQuizById } from '../glob/quizes'
import { useNavigate } from 'react-router';

// import './Quiz.css'

// Components
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'

export default function Quiz() {

  const [quiz, setQuiz] = useState(getQuizById('q_m_0_0'));

  useEffect(_ => {
    if (quiz.error)
      console.log("error")

  }, [quiz])

  return (
    <>
      {quiz.element}
    </>
  )
}
