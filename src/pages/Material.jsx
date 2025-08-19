import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import NotFound from './NotFound'

import { getMaterialByIndex } from '../glob/materials/main'
import { addHistory, createQuizList, incrementMaterialLevel, resetQuiz} from '../glob/state'

import styles from './Material.module.css'

export default function Material() {

  // TODO: navigate to landing if user hasnt started
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const quizState = useSelector(stat => stat.quiz.value);

  const invalidState = !userState.hasStarted || userState.history.length === 0;

  const getMaterialData = _ => {
    if (invalidState)
      return {id: -1, error: 1, component: null};

    const materialIndex = userState.history[0].data.material_id;
    const materialData = getMaterialByIndex(materialIndex);

    if(materialData.error)
      console.error(`error while obtaining material index of ${materialIndex}`);

    return materialData;
  };

  const [receivedMaterialData, setReceivedMaterialData] = useState(getMaterialData());

  
  const startQuiz = useCallback(_ => {
    dispatch(addHistory({
      type: 'quiz',
      data: {
        material: {
          id: receivedMaterialData.id,
          terms: receivedMaterialData.terms,
        },
      },
    }));

    dispatch(resetQuiz())
    dispatch(createQuizList({
        material: receivedMaterialData,
    }))
    navigate("/quiz");
  }, [receivedMaterialData]);

  const goHome = useCallback(_ => {
    navigate("/");
  }, []);
  

  return (
    <>
        {receivedMaterialData.error ? <NotFound /> : <DefaultDisplay receivedMaterialData={receivedMaterialData} goHome={goHome} startQuiz={startQuiz} />}
    </>
  )
}

function DefaultDisplay({receivedMaterialData, goHome, startQuiz}) {
  return (
  <div className={styles['content']}>
    <div className={styles['header-container']}>
      <div className={styles['textart']}>
        <p className={styles['lvl']}>
          Materi Level {receivedMaterialData.id + 1}
        </p>
        <h1 className={styles['header']}>
          {receivedMaterialData.title}
        </h1>
      </div>
    </div>
    <div className={styles['material-container']}>
      {receivedMaterialData.component()}
    </div>
    <button onClick={startQuiz} className={styles['start-quiz-btn']}>Latihan Kuis</button>
    <button className={styles['back-btn']} onClick={goHome}>Kembali ke halaman utama</button>
  </div>);
}