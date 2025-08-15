import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import NotFound from './NotFound'

import { getMaterialByIndex } from '../glob/materials/main'
import { addHistory, generateQuiz, incrementMaterialLevel, resetQuiz} from '../glob/state'

import styles from './Material.module.css'

export default function Material() {

  // TODO: navigate to landing if user hasnt started
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const quizState = useSelector(stat => stat.quiz.value);

  const [receivedMaterialData, setReceivedMaterialData] = useState({id: null, error: false, component: _ => {}});

  // update material
  useEffect(_ => {
    const materialIndex = userState.history[0].data.material_id;
    const materialData = getMaterialByIndex(materialIndex);

    if(receivedMaterialData.error)
      console.log(`error while obtaining material index of ${materialIndex}`)

    setReceivedMaterialData(materialData);
  }, [materialState])


  // Callback
  const startQuiz = () => {
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
    dispatch(generateQuiz({
        material: {
          id: receivedMaterialData.id,
          terms: receivedMaterialData.terms,
        },
    }))
    navigate("/quiz");
  };

  const goHome = () => {
    navigate("/");
  };
  

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