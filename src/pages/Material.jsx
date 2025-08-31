import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import NotFound from './NotFound'
import ArrowGoPrimary from '/PrimaryArrowGo.svg';

import { useIsMobile } from '../glob/util';
import { getMaterialByIndex } from '../glob/materials/main'
import { addHistory, createQuizList, resetQuiz, setPrevMaterialLvl} from '../glob/state'

import MascotGreetings from '../comps/MascotGreetings';
import styles from './Material.module.css'

export default function Material() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);

  const invalidState = !userState.hasStarted || userState.history.length === 0;

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
    dispatch(addHistory({
      type: 'quiz',
      data: {
        material: {
          id: receivedMaterialData.current.id,
          terms: receivedMaterialData.current.terms,
        },
      },
    }));

    dispatch(setPrevMaterialLvl(materialState.materialLevel));
    dispatch(resetQuiz());
    dispatch(createQuizList({
        level: materialState.materialLevel,
        material: receivedMaterialData.current,
    }));
    navigate("/quiz");
  }, [receivedMaterialData.current]);

  const goHome = useCallback(_ => {
    navigate("/");
  }, []);
  

  return (
    <>
        {receivedMaterialData.current.error ? <NotFound /> : <DefaultDisplay receivedMaterialData={receivedMaterialData.current} goHome={goHome} startQuiz={startQuiz} />}
    </>
  )
}

function DefaultDisplay({receivedMaterialData, goHome, startQuiz}) {

  const isMobile = useIsMobile();

  return (
  <div className={styles['content']}>
    <div className={styles['header-container']}>
      <div className={styles['textart']}>
        <p className={styles['lvl']}>
          Materi Level {receivedMaterialData.id + 1} &nbsp;&nbsp;&bull;&nbsp;&nbsp; {receivedMaterialData.estimateDuration}
        </p>
        <h1 className={styles['header']}>
          {receivedMaterialData.title}
        </h1>
      </div>
      {
        isMobile ? null :        
        <MascotGreetings scale={1.45} className={styles['mascot']} />
      }
    </div>
    <div className={styles['material-container']}>
      {receivedMaterialData.component()}
    </div>
    <button onClick={startQuiz} className={styles['start-quiz-btn']}>
      Mulai Kuis Latihan {receivedMaterialData.title}
      <img src={ArrowGoPrimary} alt='' width='5' />
    </button>
    <button className={styles['back-btn']} onClick={goHome}>Kembali ke halaman utama</button>
  </div>);
}