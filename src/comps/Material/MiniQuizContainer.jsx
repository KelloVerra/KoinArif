import { useCallback, useRef, useState } from 'react';


import styles from '../../pages/Material.module.css'
import coinLogo from '/Budget3D.svg'



export default function MiniQuizContainer({id}) {

    const [hasStarted, SetHasStarted] = useState(false);
    const [hasAnswered, SetHasAnswered] = useState(false);
    const rewardOverview = useRef(10);

    const onAnswer = useCallback((opt) => {
        console.log(opt);
        SetHasAnswered(true);
    }, []);
    const onStart = _ => {
        SetHasStarted(true);
    };
 
    return (<>
        <div className={styles['miniquiz-container']}>
            <h1>Mini Quiz Submodul {id.submodule_id+1}</h1>
            {
                hasStarted ?
                <QuizDisplay onAnswer={onAnswer} rewardOverview={rewardOverview.current} /> :
                <QuizStarter onStart={onStart} rewardOverview={rewardOverview.current} />
            }
        </div>
    </>);
}

function QuizStarter({onStart, rewardOverview}) {
    return (
        <div onClick={onStart} className={styles['quiz-starter-container']}>
            <div className={styles['quiz-starter-content']}>
                <p>Mulai</p>
                <div className={styles['quiz-reward-display']}>
                    <img src={coinLogo} alt='coinLogo' width='20'/>
                    <p>+{rewardOverview}</p>
                </div>
            </div>
        </div>
    );
}

function QuizDisplay({onAnswer, rewardOverview}) {
    return (
        <div className={styles['quiz-container']}>
            <div className={styles['quiz-header']}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ratione autem commodi ex voluptatum aspernatur. Iusto in aspernatur itaque reprehenderit at ipsam praesentium aperiam alias quis ab! Non, inventore tenetur!</p>
                <div className={styles['quiz-reward-display']}>
                    <img src={coinLogo} alt='coinLogo' width='20'/>
                    <p>+{rewardOverview}</p>
                </div>
            </div>
            <div className={styles['quiz-options']}>
                <button onClick={_ => console.log('a')} className={styles['quiz-option']}>
                    Hello
                </button>
                <button onClick={_ => console.log('b')} className={styles['quiz-option']}>
                    XXX
                </button>
                <button onClick={_ => console.log('c')} className={styles['quiz-option']}>
                    A
                </button>
            </div>
        </div>
    );
}