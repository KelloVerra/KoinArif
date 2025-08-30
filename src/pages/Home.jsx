import { Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHistory, } from '../glob/state';
import { useNavigate } from 'react-router';
import { getMaterials } from '../glob/materials/main';
import { randomLength, useIsMobile } from '../glob/util';

import MascotGreetings from '../comps/MascotGreetings';
import ArrowGoPurple from '/PurpleArrowGo.svg';
import ArrowGoPrimary from '/PrimaryArrowGo.svg';
import LockPurple from '/PurpleLock.svg';
import LockWhite from '/WhiteLock.svg';
import styles from './Home.module.css'



export default function Home() {
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);

  const isMobile = useIsMobile();
  const materials = useRef(getMaterials());
  const materialCardContainer = useRef(null);


  
  const greetings = _ => {
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
      'Belajar 5 menit setiap hari hasilnya dahsyat daripada tidak belajar!',
    ];
    return quotes[randomLength(quotes.length)];
  }




  useEffect(_ => { // skrol horizontal
    if(materialCardContainer.current) {
      const act = e => {
        e.preventDefault();
        materialCardContainer.current.scrollLeft += e.deltaY;
      };

      materialCardContainer.current.addEventListener('wheel', act, { passive: false })
      return _ => {
        if(materialCardContainer.current)
          materialCardContainer.current.removeEventListener('wheel', act, { passive: false })
      };
    }
  }, [materialCardContainer.current]);




  return (
    <main>
      <div className={styles['content']}>
        <div className={styles['heading-container']}>
          <div className={styles['greetings-container']}>
            <div className={styles['greetings-content']}>
              <h1>Selamat <span className={styles['gradient-heading']}>{greetings()}!</span></h1>
              <p>" {motivQuote()} "</p>
              <p>- Arif</p>
            </div>
            <ContinueLastActivityButton />
          </div>

          <MascotGreetings scale={isMobile ? 1.25 : 1.5} className={styles['mascot']} />
        </div>

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
        txt = `Mari mulai Belajar ${getMaterials()[materialState.materialLevel]().title}!`
        break;
      case 'material':
        txt = `Lanjut Bahas ${getMaterials()[history.data.material_id]().title}, gaskan!`
        break;
      case 'quiz':
        txt = `Lanjutin Quiz ${getMaterials()[history.data.material.id]().title}, yuk!`
        break;
    }
    return txt;
  }

  return (
    <button className={styles['continue-activity-button']} onClick={continueLastActivity}>
      {formatHistory()}
      <img src={ArrowGoPrimary} alt='' width='5' />
    </button>
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
      <h2 className={styles['title']}>{material.title}</h2>
      <p className={styles['desc']}>{material.desc}</p>
      <div className={styles['material-card-misc']}>
        <p>{material.estimateDuration}</p>
        <img src={ArrowGoPurple} alt='' width='5' />
      </div>
    </div>
  )
}
function LockedMaterialCard({material}) {

  const startMaterial = _ => {
    console.log('terkunci')
  };

  return (
    <div className={`${styles['material-card']} ${styles['material-card-locked']}`} onClick={startMaterial}>
      <p className={styles['lvl']}>Materi Level {material.id+1} <img src={LockWhite} alt='' width='5' /> </p>
      <h2 className={styles['title']}>{material.title}</h2>
      <p className={styles['desc']}>{material.desc}</p>
      <div className={styles['material-card-misc']}>
        <img src={LockPurple} alt='' width='5' />
      </div>
    </div>
  )
}