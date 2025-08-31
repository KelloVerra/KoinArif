import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getQuizFormatProcessorByFormatIndex } from '../glob/quizes.js'
import { advanceQuiz, completeQuiz, addAnsweredQuizData, addUserBudget, addEmptyHistory, unlockNextMaterial } from '../glob/state';
import { randomLength, useIsMobile } from '../glob/util';

import styles from './QuizPage.module.css'
import coinIcon from '/Budget3D.svg';
import checkBadgeIcon from '/CheckBadge.svg';
import materialLevelIcon from '/Level.svg'
import NotFound from './NotFound';
import MascotQuizComplete from '../comps/MascotQuizComplete.jsx';
import MascotQuiz from '../comps/MascotQuiz.jsx';
import toast from 'react-hot-toast';


export default function QuizPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const quizState = useSelector(stat => stat.quiz.value);

  const currentQuiz = quizState.generatedQuizes[quizState.currentGeneratedQuizIndex];
  const invalidState = !userState.hasStarted || !currentQuiz;

  const hadReloaded = useRef(false);
  useEffect(_ => {
    if (hadReloaded.current) return;
    if (quizState.answeredQuizes[quizState.currentGeneratedQuizIndex]) nextQuestion();

    hadReloaded.current = true;
  }, []);



  const addAnswerState = useCallback(v => dispatch(addAnsweredQuizData({...v})))

  const nextQuestion = useCallback(_ => {
    window.scrollTo(0, 0);
    dispatch(advanceQuiz());
    
    if (quizState.currentGeneratedQuizIndex >= quizState.generatedQuizes.length-1) {
      dispatch(unlockNextMaterial(
        userState.history[0].type === 'empty' ?
        userState.history[1].data.material.id :
        userState.history[0].data.material.id
      ));
      dispatch(completeQuiz({}));
    }
  }, [quizState.currentGeneratedQuizIndex]);
  
  const confirmEnd = useCallback(_ => {
    navigate("/");
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
                          addAnswerState={addAnswerState}
          />
        }
      </div>
      }
    </>
  )
}

function QuizInterface({state, quiz, onNextQuestion, addAnswerState}) {
  const [confirmable, setConfirmable] = useState(false);
  const reward = state.generatedQuizes[state.currentGeneratedQuizIndex].reward;

  const [correctState, setCorrectState] = useState(0);
  
  useEffect(_ => {
    setConfirmable(false);
    setCorrectState(0);
  }, [quiz]);
  const triggerAnswer = correct => {
    setConfirmable(true);
    if (correct)
      setCorrectState(1);
    else
      setCorrectState(2);
  }

  const selectQuizFormat = _ => {
    switch (quiz.display_format) {
      case 0:
        return <MultipleChoiceQuestion 
                  data={quiz}
                  confirmable={{state: confirmable, trigger: triggerAnswer}}
                  addAnswerState={addAnswerState}
                  reward={reward}
                />
      // case 1:
      //   return <MatchingQuestion 
      //             data={quiz}
      //             confirmable={{state: confirmable, set: setConfirmable}}
      //             addAnswerState={addAnswerState}
      //             reward={reward}
      //           />;
    }
  };

  return (
    <>
      <div className={styles['quiz-header']}>
        <div className={styles['quiz-mascot-container']}>
          <MascotQuiz scale={1.25} state={correctState} />
        </div>
        <div className={styles['quiz-detail-container']}>
          <div className={styles['quiz-stat-container']}>
            <h1>Quiz {state.currentGeneratedQuizIndex+1}</h1>
            <h1 className={styles['leftovr']}>/{state.generatedQuizes.length}</h1>
            
            <div className={styles['quiz-reward-display']}>
              <img src={coinIcon} alt='coinIcon' width='20' />
              <p>+{reward} koin</p>
            </div>
          </div>

          <div className={styles['quiz-question-container']}>
            <p>{quiz.question}</p>
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

function MultipleChoiceQuestion({data, confirmable, addAnswerState, reward}) {

  const [answeredInd, setAnsweredInd] = useState(-1);
  const [answerState, setAnswerState] = useState('multchoice-quiz-option-incorrect');
  const isMobile = useIsMobile();


  useEffect(_ => {
    if (answeredInd === -1) return;
    const selOption = data.options[answeredInd];
    const processor = getQuizFormatProcessorByFormatIndex(selOption.parent_format);
	  const correct = processor.is_options_correct(selOption);
	
    setAnswerState(correct ? 'multchoice-quiz-option-correct' : 'multchoice-quiz-option-incorrect');
    addAnswerState({
      quiz_data: data,
      accuracy: correct ? 1 : 0,
      gotReward: correct ? reward : 0,
    });

    confirmable.trigger(correct);
  }, [answeredInd]);
  
  useEffect(_ => {
    if (!confirmable.state)
      setAnsweredInd(-1);
  }, [confirmable.state]);
  
  return (
    <div 
      className= {styles['multchoice-quiz-option-container']} 
      deps= {[confirmable.state, data, answeredInd, answerState]} 
      style= {{
        gridTemplateColumns:`repeat(${isMobile ? 1 : data.options.length}, 1fr)`
      }}
    >
      {Array.from({length: data.options.length}).map((_, i) =>
        <button key={i} className={`${styles[`multchoice-quiz-option`]} ${styles[answeredInd === i ? answerState : '']}`} onClick={_ => setAnsweredInd(i)} disabled={confirmable.state}> {data.options[i].desc} </button>
      )}
    </div>
  );
}

function Finish({onConfirmEnd}) {

  const quizState = useSelector(stat => stat.quiz.value);
  const userState = useSelector(stat => stat.user.value);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const msgs = [
    <>
      Waw! Kamu&nbsp;
      <span className={styles["gradient-heading"]}>
        Keren banget!
      </span>
    </>,
    <>
      Kerja bagus! Ini langkah kecil ke&nbsp;
      <span className={styles["gradient-heading"]}>
        hasil yang besar.
      </span>
    </>,
    <>
      Tuntas deh! siap untuk yang&nbsp;
      <span className={styles["gradient-heading"]}>
        berikutnya?
      </span>
    </>,
    <>
      Nilai tak segalanya,&nbsp;
      <span className={styles["gradient-heading"]}>
        usahamu-lah yang lebih berharga.
      </span>
    </>,
    <>
      Bangga dong, kamu sudah&nbsp;
      <span className={styles["gradient-heading"]}>
        satu langkah lebih pintar!
      </span>
    </>,
    <>
      Kesalahan itu&nbsp;
      <span className={styles["gradient-heading"]}>
        guru terbaik
      </span>, terus belajar, terus tumbuh.
    </>,
    <>
      Kamu nggak harus sempurna kok!&nbsp;
      <span className={styles["gradient-heading"]}>
        cukup terus berkembang.
      </span>
    </>,
  ];
  const coins = quizState.quizCompletionRecapData.totalReward;
  const accuracy = quizState.quizCompletionRecapData.accuracy;

  
  const hasRaisedLevel = (
    userState.history[1].type === 'quiz' ?
      userState.history[1].data.material.id === quizState.prevMaterialLvl :
      false
  );

  const hadReloaded = useRef(false);
  useEffect(_ => {
    if (hadReloaded.current) return;
    if (userState.history[0].type != 'quiz') return;

    toast.success(
      `+${coins} Koin`,
      {
        icon: <img src={coinIcon} alt='[coinIcon]' width='5' style={{height:'1.618rem',width:'auto'}} />
      }
    );
    
    if (userState.history[0].data.material.id === quizState.prevMaterialLvl)
      toast.success(
        `Level Up`,
        {
          icon: <img src={materialLevelIcon} alt='[levelIcon]' width='5' style={{height:'1.618rem',width:'auto'}} />
        }
      );
    dispatch(addEmptyHistory());
    dispatch(addUserBudget(coins));
    hadReloaded.current = true;
  }, []);



  return (<>
    <div className={styles['quiz-fin-header']}>
      <MascotQuizComplete scale={isMobile ? 1.75 : 1.25} className={styles['mascot']} />
      <h2>{msgs[randomLength(msgs.length)]}</h2>
    </div>
    <div className={styles['quiz-fin-content']}>
      <div className={styles['quiz-fin-stat-container']} style={{gridTemplateColumns: `repeat(${hasRaisedLevel ? 3 : 2}, 1fr)`}}>
        <div className={styles['quiz-fin-stat-coin']}>
          <img src={coinIcon} alt="[coinIcon]" width='40px' />
          <p>+{coins} Koin</p>
        </div>
        <div className={styles['quiz-fin-stat-accuracy']}>
          <img src={checkBadgeIcon} alt="[accuracyIcon]" width='40px' />
          <p>{Math.round(accuracy*100)}%</p>
        </div>
        {
          hasRaisedLevel ?
          <div className={styles['quiz-fin-stat-lvl']}>
            <img src={materialLevelIcon} alt="[levelIcon]" width='40px' />
            <p>Level Up!</p>
          </div> : 
          null
        }
      </div>
      <button onClick={onConfirmEnd} className={styles['quiz-fin-btn']}>
        Selesai
      </button>
    </div>
  </>);
}