import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import NotFound from './NotFound'
import ArrowGoPrimary from '/PrimaryArrowGo.svg';

import { useIsMobile } from '../glob/util';
import { getMaterialByIndex } from '../glob/materials/main'
import { addHistory, createQuizList, resetQuiz, setPrevMaterialLvl, spendUserBudget} from '../glob/state'

import MascotGreetings from '../comps/MascotGreetings';
import coinLogo from '/Budget3D.svg'
import styles from './Material.module.css'
import QuizInsufficientCoin from '../comps/Popup/QuizInsufficientCoin';

export default function Material() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const invalidState = !userState.hasStarted || userState.history.length === 0;

  const [insufficientCoinPopupVisible, setInsufficientCoinPopupVisible] = useState(false)


  const receivedMaterialData = useRef((_ => {
    if (invalidState)
      return {id: -1, error: 1, component: null};

    const materialIndex = userState.history[0].data.material_id;
    const materialData = getMaterialByIndex(materialIndex);

    if(materialData.error)
      console.warn(`unable to obtain material index of ${materialIndex}`);

    return materialData;
  })());
  


  const startQuiz = useCallback(_ => {
    if (userState.budget < receivedMaterialData.current.requiredQuizCoins) {
      setInsufficientCoinPopupVisible(true);
      return;
    }
    dispatch(addHistory({
      type: 'quiz',
      data: {
        material: {
          id: receivedMaterialData.current.id,
          terms: receivedMaterialData.current.terms,
        },
      },
    }));

    toast.success(
                `-${receivedMaterialData.current.requiredQuizCoins} Koin`,
                {
                    icon: <img src={coinLogo} alt='[coinIcon]' width='5' style={{height:'1.618rem',width:'auto'}} />
                }
            );
    dispatch(spendUserBudget(receivedMaterialData.current.requiredQuizCoins));
    dispatch(setPrevMaterialLvl(materialState.materialLevel));
    dispatch(resetQuiz());
    dispatch(createQuizList({
        level: materialState.materialLevel,
        material: receivedMaterialData.current,
    }));
    navigate("/quiz");
  }, [receivedMaterialData.current, userState.budget]);


  const goHome = useCallback(_ => {
    navigate("/");
  }, []);
  




  return (
    <>
      <QuizInsufficientCoin visible={{val:insufficientCoinPopupVisible, set:setInsufficientCoinPopupVisible}} />
      {receivedMaterialData.current.error ? <NotFound /> : <DefaultDisplay receivedMaterialData={receivedMaterialData.current} goHome={goHome} startQuiz={startQuiz} />}
    </>
  )
}

function DefaultDisplay({receivedMaterialData, goHome, startQuiz}) {

  const userState = useSelector(stat => stat.user.value);
  const isMobile = useIsMobile();
  const ableToStartQuiz = userState.budget >= receivedMaterialData.requiredQuizCoins;

  return (
  <div className={styles['content']}>
    <div className={styles['header-container']}>
      <div className={styles['textart']}>
        <p className={styles['lvl']}>
          Materi Level {receivedMaterialData.id + 1} &nbsp;&nbsp;&bull;&nbsp;&nbsp; {receivedMaterialData.estimateDuration}
        </p>
        {receivedMaterialData.displayTitle}
      </div>
      {
        isMobile ? null :        
        <MascotGreetings scale={1.45} className={styles['mascot']} />
      }
    </div>
    <div className={styles['material-container']}>
      {receivedMaterialData.component()}
    </div>
    <button onClick={startQuiz} className={`${styles['start-quiz-btn']} ${ableToStartQuiz ? styles['start-quiz-btn-enabled'] : ''}`}>
      <div className={styles['quiz-requirement-display']}>
          <img src={coinLogo} alt='coinLogo' width='20'/>
          <p>{receivedMaterialData.requiredQuizCoins}</p>
      </div>
      Mulai Kuis Latihan {receivedMaterialData.title}
      <img src={ArrowGoPrimary} alt='' width='5' />
    </button>
    <button className={styles['back-btn']} onClick={goHome}>Kembali ke halaman utama</button>
  </div>);
}