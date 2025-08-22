import { useCallback, useEffect, useRef, useState } from 'react';


import styles from '../../pages/Material.module.css'
import coinLogo from '/Budget3D.svg'
import { useDispatch, useSelector } from 'react-redux';
import { getMaterials } from '../../glob/materials/main';
import { generateMaterialQuiz, generateSubmoduleQuiz, getQuizFormatProcessorByFormatIndex } from '../../glob/quizes';
import { addUserBudget } from '../../glob/state';



export default function MiniQuizContainer({id}) {

    const [hasStarted, SetHasStarted] = useState(false);
    const [hasAnswered, SetHasAnswered] = useState(false);

    const dispatch = useDispatch();

    const rewardOverview = useRef(5); // random tbd
    const containerRef = useRef(null);
    const containerHeight = useRef(30);
    const [questionData, setQuestionData] = useState(null);

    const onAnswer = useCallback((opt) => {
        dispatch(addUserBudget(rewardOverview.current * opt.accuracy));
        SetHasAnswered(true);
    }, []);
    const onStart = _ => {
        SetHasStarted(true);
    };

    useEffect(_ => {
        // note: might source of bug
        if (containerRef.current)
            containerHeight.current = containerRef.current.clientHeight + 300;
    }, []);

    useEffect(_ => {
        if (!hasStarted) return;
        const submoduleData = getMaterials()[id.material_id]().submoduleData[id.submodule_id];
        setQuestionData(generateSubmoduleQuiz(submoduleData));
    }, [hasStarted]);

    const validStart = hasStarted && questionData;
    return (<>
        <div className={styles['miniquiz-container']}>
            <h1>Mini Quiz Submodul {id.submodule_id+1}</h1>
            <div ref={containerRef} onClick={onStart} className={validStart ? styles['quiz-container'] : styles['quiz-starter-container']} style={{maxHeight: hasStarted ? `${containerHeight.current}px` : '30px'}}>
            {
                validStart ?
                <QuizDisplay onAnswer={onAnswer} hasAnswered={hasAnswered} rewardOverview={rewardOverview.current} questionData={questionData} /> :
                <QuizStarter rewardOverview={rewardOverview.current} />
            }
            </div>
        </div>
    </>);
}

function QuizStarter({rewardOverview}) {
    return (
        <>
            <div className={styles['quiz-starter-content']}>
                <p>Mulai</p>
                <div className={styles['quiz-reward-display']}>
                    <img src={coinLogo} alt='coinLogo' width='20'/>
                    <p>+{rewardOverview}</p>
                </div>
            </div>
        </>
    );
}

function QuizDisplay({onAnswer, hasAnswered, rewardOverview, questionData}) {

    const displayOptionLayout = _ => {
        switch(questionData.questionData.display_format) {
            case 0:
                return <MultipleChoiceOptionLayout questionData={questionData} onAnswer={onAnswer} />
        }
    };

    return (
        <div className={styles['quiz-content']}>
            <div className={styles['quiz-header']}>
                <p>{questionData.questionString}</p>
                <div className={styles['quiz-reward-display']} style={{opacity: hasAnswered ? 0 : 1}}>
                    <img src={coinLogo} alt='coinLogo' width='20'/>
                    <p>+{rewardOverview}</p>
                </div>
            </div>
            {displayOptionLayout()}
        </div>
    );
}

function MultipleChoiceOptionLayout({questionData, onAnswer}) {

    const [answeredInd, setAnsweredInd] = useState(-1);
    const [answerState, setAnswerState] = useState('');

    useEffect(_ => {
        if (answeredInd === -1) return;
        const selOption = questionData.options[answeredInd];
        const processor = getQuizFormatProcessorByFormatIndex(selOption.parent_format);
        const correct = processor.is_options_correct(selOption);
        
        setAnswerState(correct ? 'quiz-option-correct' : 'quiz-option-incorrect');
        onAnswer({
            quizData: questionData,
            accuracy: correct ? 1 : 0,
        });
    }, [answeredInd]);

    return (
        <div className={styles['quiz-options']} deps={[answeredInd]} style={{gridTemplateColumns:`repeat(${questionData.options.length}, 1fr)`}}>
            {questionData.options.map((v, i) => 
            <button key={i} disabled={answeredInd != -1} onClick={_ => setAnsweredInd(i)} className={`${styles[`quiz-option`]} ${styles[answeredInd === i ? answerState : '']}`}>
                {v.desc}
            </button>)}
        </div>
    );
}