import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHistory, } from '../glob/state';
import { useNavigate } from 'react-router';

import styles from './Home.module.css'
import budgetLogo from '/Budget3D.svg'
import materialLevelLogo from '/Level.svg'

import { getMaterials } from '../glob/materials/main';

export default function Home() {
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const quizState = useSelector(stat => stat.quiz.value);

  const materials = useRef(getMaterials());
  const materialCardContainer = useRef(null);

  const greetings = _ => {
    // Time based greetings
    const hour = new Date().getHours();
    if (hour <= 9) return "Pagi";
    else if (hour <= 15) return "Siang";
    else if (hour <= 18) return "Sore";
    else return "Malam";
  };
  const motivQuote = _ => {
    const quotes = [
      'Tunggu apa lagi? Yuk, luangkan waktu untuk belajar!',
      'Jangan menunggu motivasi, langsung saja mulai!',
      'Kata pepatah, waktu adalah uang..',
      'Menginvestasikan dirimu dengan belajar, hargai masa depanmu..',
      'Belajar Literasi Finansial 5 menit setiap hari hasilnya sangatlah dahsyat dibandingkan dengan tidak belajar sama sekali',
    ];
    return quotes[Math.floor(Math.random()*quotes.length)];
  }

  useEffect(_ => { // skrol horizontal
    if(materialCardContainer.current) {
      materialCardContainer.current.addEventListener('wheel', e => {
        e.preventDefault();
        materialCardContainer.current.scrollLeft += e.deltaY;
      }, { passive: false })
    }
  }, [materialCardContainer.current]);

  return (
    <main>
      <div className={styles['content']}>
        <div className={styles['greetings-container']}>
          <div className={styles['greetings-content']}>
            <h1>Selamat <span style={{color:'var(--col-accent1)'}}>{greetings()}</span>!</h1>
            <p>" {motivQuote()} "</p>
            <p>- Arif</p>
          </div>
          <ContinueLastActivityButton />
        </div>
        {/* Mascot here */}
        <div className={styles['material-container']}>
          <h1>Materi</h1>
          <div className={styles['material-card-container']} ref={materialCardContainer}>
            {materials.current.map(v => {
              const material = v();
              if(material.id > materialState.materialLevel)
                return <LockedMaterialCard key={material.id} material={material} />
              return <MaterialCard key={material.id} material={material} />
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

function ContinueLastActivityButton({}) {

  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const continueLastActivity = _ => {
    const history = userState.history[0];
    switch(history.type) {
      case 'empty':
        dispatch(addHistory({
          type: 'material',
          data: {
            material_id: materialState.materialLevel,
          },
        }));
        navigate('/material');
        break;
      case 'material':
        navigate('/material');
        break;
      case 'quiz':
        navigate('/quiz');
        break;
    } 
  };

  const formatHistory = _ => {
    const history = userState.history[0];
    let txt = "";

    switch(history.type) {
      case 'empty':
        txt = `Mari mulai Belajar materi ${getMaterials()[materialState.materialLevel]().title}`
        break;
      case 'material':
        txt = `Lanjut Bahas ${getMaterials()[history.data.material_id]().title}, gas!`
        break;
      case 'quiz':
        txt = `Lanjutin Quiz ${getMaterials()[history.data.material.id]().title}, yuk!`
        break;
    }
    return txt;
  }

  return (
    <button className={styles['continue-activity-button']} onClick={continueLastActivity}>{formatHistory()}</button>
  )
}

function MaterialCard({material}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startMaterial = _ => {
    dispatch(addHistory({
        type: 'material',
        data: {
          material_id: material.id,
        },
      }));
    navigate("/material");
  };

  return (
    <div className={styles['material-card']} onClick={startMaterial}>
      <p className={styles['lvl']}>Materi Level {material.id+1}</p>
      <h1 className={styles['title']}>{material.title}</h1>
      <p className={styles['desc']}>{material.desc}</p>
    </div>
  )
}
function LockedMaterialCard({material}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startMaterial = _ => {
    console.log('terkunci')
  };

  return (
    <div className={`${styles['material-card']} ${styles['material-card-locked']}`} onClick={startMaterial}>
      <p className={styles['lvl']}>Materi Level {material.id+1} (Terkunci)</p>
      <h1 className={styles['title']}>{material.title}</h1>
      <p className={styles['desc']}>{material.desc}</p>
    </div>
  )
}