import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getQuizFormatProcessorByFormatIndex, getQuizTemplateByIndex } from '../glob/quizes'
import { advanceQuiz, completeQuiz, incrementCorrectQuiz } from '../glob/state';
import { randomLength } from '../glob/util';

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

  const choiceAnswer = useRef(false);
  const setChoiceAnswer = useCallback(v => {
    choiceAnswer.current = v;
    if (v) dispatch(incrementCorrectQuiz());
	console.log(quizState.correctQuizes);
  })

  // TODO: Collect budget
  const nextQuestion = useCallback(_ => {
    window.scrollTo(0, 0);
    dispatch(advanceQuiz())
    
    if (quizState.currentGeneratedQuizIndex >= quizState.generatedQuizes.length-1)
      dispatch(completeQuiz({}));
  }, [quizState.currentGeneratedQuizIndex]);
  
  const confirmEnd = useCallback(_ => {
    navigate("/");
  }, []);

  const onQuestionBookmarked = useCallback(_ => {
    console.log('bookmarked');
  }, []);

  return (
    <>
      {
      invalidState ? 
      <NotFound /> :
      <div className={styles['content']}>
        {
          quizState.quizCompletionRecapData.finished ?
          <Finish onConfirmEnd={confirmEnd} /> :
          <QuizInterface  state={quizState}
                          quiz={currentQuiz}
                          onNextQuestion={nextQuestion}
                          onQuestionBookmarked={onQuestionBookmarked}
                          choiceAnswer={{state:choiceAnswer, set:setChoiceAnswer}}
          />
        }
      </div>
      }
    </>
  )
}

function QuizInterface({state, quiz, onNextQuestion, onQuestionBookmarked, choiceAnswer}) {
  const [confirmable, setConfirmable] = useState(false);

  useEffect(_ => {
    setConfirmable(false);
  }, [quiz]);

  const selectQuizFormat = _ => {
    switch (quiz.display_format) {
      case 0:
        return <MultipleChoiceQuestion 
                  data={quiz}
                  confirmable={{state: confirmable, set: setConfirmable}}
                  setAnswerChoiceState={choiceAnswer.set}
                />
      case 1:
        return <MatchingQuestion 
                  data={quiz}
                  confirmable={{state: confirmable, set: setConfirmable}}
                  setAnswerChoiceState={choiceAnswer.set}
                />;
    }
  };

  const rew = 60;

  return (
    <>
      <div className={styles['quiz-header']}>
        <img src={coinIcon} width='150px' />
        <div style={{width:'100%'}}>
          <div className={styles['quiz-stat-container']}>
            <h1>Quiz {state.currentGeneratedQuizIndex+1}</h1>
            <h2>/{state.generatedQuizes.length}</h2>
            <div className={styles['quiz-reward-display']}>
              <img src={coinIcon} alt='coinIcon' width='20' />
              <p>+{rew} koin</p>
            </div>
          </div>
          <div className={styles['quiz-question-container']}>
            <p>{quiz.question}</p>
            <img src={bookmarkIcon} alt='bookmarkQuestion' width='20' onClick={onQuestionBookmarked} />
          </div>
        </div>
      </div>
      {selectQuizFormat()}
      <button className={styles['quiz-confirm-btn']} disabled={!confirmable} onClick={_ => onNextQuestion()}>
        Lanjut
      </button>
    </>
  );
}

function MultipleChoiceQuestion({data, confirmable, setAnswerChoiceState}) {

  const [answeredInd, setAnsweredInd] = useState(-1);
  const [answerState, setAnswerState] = useState('matching-quiz-option-incorrect');

  useEffect(_ => {
    if (answeredInd === -1) return;
    const selOption = data.options[answeredInd];
    const processor = getQuizFormatProcessorByFormatIndex(selOption.parent_format);
	const correct = processor.is_options_correct(selOption);

	console.log(correct);
	
    setAnswerChoiceState(correct);
    setAnswerState(correct ? 'matching-quiz-option-correct' : 'matching-quiz-option-incorrect');

    confirmable.set(true);
  }, [answeredInd]);
  
  useEffect(_ => {
    if (!confirmable.state)
      setAnsweredInd(-1);
  }, [confirmable.state]);
  
  return (
    <div className={styles['matching-quiz-option-container']}>
      <button className={`${styles[`matching-quiz-option`]} ${styles[answeredInd === 0 ? answerState : '']}`} onClick={_ => setAnsweredInd(0)} disabled={confirmable.state}> {data.options[0].desc} </button>
      <button className={`${styles[`matching-quiz-option`]} ${styles[answeredInd === 1 ? answerState : '']}`} onClick={_ => setAnsweredInd(1)} disabled={confirmable.state}> {data.options[1].desc} </button>
      <button className={`${styles[`matching-quiz-option`]} ${styles[answeredInd === 2 ? answerState : '']}`} onClick={_ => setAnsweredInd(2)} disabled={confirmable.state}> {data.options[2].desc} </button>
    </div>
  );
}

function Finish({onConfirmEnd}) {

  const quizState = useSelector(stat => stat.quiz.value);
  const dispatch = useDispatch();

  const msgs = [
    'Waw! Kamu Keren banget!',
    'Kerja bagus! Ini langkah kecil ke hasil yang besar.',
    'Tuntas deh! siap untuk yang berikutnya?',
    'Nilai tak segalanya, usahamu-lah yang lebih berharga.',
    'Kerja bagus! Ini langkah kecil ke hasil yang besar.',
    'Bangga dong, kamu sudah satu langkah lebih pintar!',
    'Kesalahan itu guru terbaik, terus belajar, terus tumbuh.',
    'Kamu nggak harus sempurna kok! cukup terus berkembang.',
  ];
  const coins = 80;
  const accuracy = quizState.correctQuizes / quizState.generatedQuizes.length;

  return (<>
    <div className={styles['quiz-fin-header']}>
      <img src={coinIcon} alt='mascot' width='150px' />
      <h1>{msgs[randomLength(msgs.length)]}</h1>
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