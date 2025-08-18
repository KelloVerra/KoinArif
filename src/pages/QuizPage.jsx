import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getQuizFormatProcessorByFormatIndex, getQuizTemplateByIndex } from '../glob/quizes'
import { advanceQuiz, completeQuiz, generateQuiz, resetQuiz } from '../glob/state';

import styles from './QuizPage.module.css'
import bookmarkIcon from '/Bookmark.svg';
import coinIcon from '/Budget3D.svg';
import checkBadgeIcon from '/CheckBadge.svg';
import NotFound from './NotFound';


export default function QuizPage() {

  // TODO: navigate to landing if user hasnt started
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const quizState = useSelector(stat => stat.quiz.value);

  const currentQuiz = quizState.generatedQuizes[quizState.currentGeneratedQuizIndex];
  const invalidState = !userState.hasStarted || !currentQuiz;


  // TODO: Collect budget
  const nextQuestion = useCallback(_ => {
    window.scrollTo(0, 0);
    dispatch(advanceQuiz())
    
    if (quizState.currentGeneratedQuizIndex >= quizState.generatedQuizes.length-1)
      dispatch(completeQuiz({}));
  });
  
  const confirmEnd = useCallback(_ => {
    navigate("/");
  });

  const onQuestionBookmarked = useCallback(_ => {
    console.log('bookmarked');
  });

  return (
    <>
      {
      invalidState ? 
      <NotFound /> :
      <div className={styles['content']}>
        {
          quizState.quizCompletionRecapData.finished ?
          <Finish onConfirmEnd={confirmEnd} /> :
          <QuizInterface state={quizState} quiz={currentQuiz} onNextQuestion={nextQuestion} onQuestionBookmarked={onQuestionBookmarked} />
        }
      </div>
      }
    </>
  )
}

function QuizInterface({state, quiz, onNextQuestion, onQuestionBookmarked}) {
  const selectQuizFormat = _ => {
    switch (quiz.display_format) {
      case 0:
        return <MultipleChoiceQuestion data={quiz} onNextQuestion={onNextQuestion} />
      case 1:
        return <MatchingQuestion data={quiz} onNextQuestion={onNextQuestion} />;
    }
  }  

  return (
    <>
      <div className={styles['quiz-header']}>
        <img src={coinIcon} width='150px' />
        <div>
          <div className={styles['quiz-stat-container']}>
            <h1>Quiz {state.currentGeneratedQuizIndex+1}</h1>
            <h2>/{state.generatedQuizes.length}</h2>
          </div>
          <div className={styles['quiz-question-container']}>
            <p>{quiz.question}</p>
            <img src={bookmarkIcon} alt='bookmarkQuestion' width='20' onClick={onQuestionBookmarked} />
          </div>
        </div>
      </div>
      {selectQuizFormat()}
      {/* MAKE BUTTON DEACTIVATE WHEN NOT SELECTING */}
      <button className={styles['quiz-confirm-btn']}>
        Jawab
        <div className={styles['quiz-reward-display']}>
          <img src={coinIcon} alt='coinIcon' width='20' />
          <p>+60 koin</p>
        </div>
      </button>
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
    <div className={styles['matching-quiz-option-container']}>
      <button className={styles['matching-quiz-option']} onClick={_ => choose(0)}> {data.options[0].desc} </button>
      <button className={styles['matching-quiz-option']} onClick={_ => choose(1)}> {data.options[1].desc} </button>
      <button className={styles['matching-quiz-option']} onClick={_ => choose(2)}> {data.options[2].desc} </button>
    </div>
  );
}

function Finish({onConfirmEnd}) {

  const msg = 'Waw! Kamu Keren banget!';
  const coins = 80;
  const accuracy = 12./14.;

  return (<>
    <div className={styles['quiz-fin-header']}>
      <img src={coinIcon} alt='mascot' width='150px' />
      <h1>{msg}</h1>
    </div>
    <div className={styles['quiz-fin-content']}>
      <div className={styles['quiz-fin-stat-container']}>
        <div className={styles['quiz-fin-stat-coin']}>
          <img src={coinIcon} alt="coinIcon" width='40px' />
          <h2>+{coins} Koin</h2>
        </div>
        <div className={styles['quiz-fin-stat-accuracy']}>
          <img src={checkBadgeIcon} alt="accuracyIcon" width='40px' />
          <h2>{Math.round(accuracy*100)}%</h2>
        </div>
      </div>
      <button onClick={onConfirmEnd} className={styles['quiz-fin-btn']}>
        Selesai
      </button>
    </div>
  </>);
}