import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHistory, } from '../glob/state';
import { useNavigate } from 'react-router';
import { getMaterials, maximumMaterials } from '../glob/materials/main';
import { randomLength, useIsMobile } from '../glob/util';
import toast from 'react-hot-toast';

import MascotGreetings from '../comps/MascotGreetings';
import MaterialWarning from '../comps/Popup/MaterialWarning';
import ArrowGoPurple from '/PurpleArrowGo.svg';
import ArrowGoPrimary from '/PrimaryArrowGo.svg';
import ChevronH from '/ChevronH.svg';
import ChevronHOutline from '/ChevronHOutline.svg';
import LockPurple from '/PurpleLock.svg';
import LockPrimary from '/PrimaryLock.svg';
import LockWhite from '/WhiteLock.svg';

import styles from './Home.module.css'
import { utils } from 'animejs';



export default function Home() {
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);

  const isMobile = useIsMobile();
  const materials = useRef(getMaterials());
  const materialCardContainer = useRef(null);
  const [materialCardContainerScroll, setMaterialCardContainerScroll] = useState(false);

  const [isMaterialWarningVisible, setIsMaterialWarningVisible] = useState({
    materialData: {},
    goTo : _ => {},
    visible: false
  });


  
  const greetings = _ => {
    const hour = new Date().getHours();
    if (hour <= 9) return "Pagi";
    else if (hour <= 15) return "Siang";
    else if (hour <= 18) return "Sore";
    else return "Malam";
  };
  const motivQuote = useRef((_ => {
    const quotes = [
      'Tunggu apa lagi? Yuk, luangkan waktu untuk belajar!',
      'Jangan menunggu motivasi, langsung saja mulai!',
      'Kata pepatah, waktu adalah uang..',
      'Menginvestasikan dirimu dengan belajar, hargai masa depanmu..',
      'Belajar 5 menit setiap hari hasilnya dahsyat daripada tidak belajar!',
    ];
    return quotes[randomLength(quotes.length)];
  })())




  useEffect(_ => { // skrol horizontal
    if(materialCardContainer.current) {
      const act = e => {
        e.preventDefault();
        setMaterialCardContainerScroll(materialCardContainer.current.scrollLeft + e.deltaY*2);
        materialCardContainer.current.scrollLeft += e.deltaY*2;
      };

      materialCardContainer.current.addEventListener('wheel', act, { passive: false })
      return _ => {
        if(materialCardContainer.current)
          materialCardContainer.current.removeEventListener('wheel', act, { passive: false })
      };
    }
  }, [materialCardContainer.current]);
  const handleChevronClick = l => {
    const s = utils.get(materialCardContainer.current, 'font-size', false) * 6 * (l ? -1 : 1);
    materialCardContainer.current.scrollLeft += s;
    setMaterialCardContainerScroll(materialCardContainer.current.scrollLeft + s);
  };




  return (
    <main>
      <div className={styles['content']}>
        <MaterialWarning visible={{val:isMaterialWarningVisible, set:setIsMaterialWarningVisible}} goToMaterial={isMaterialWarningVisible.goTo}/>
        <div className={styles['heading-container']}>
          <div className={styles['greetings-container']}>
            <div className={styles['greetings-content']}>
              <h1>Selamat <span className={styles['gradient-heading']}>{greetings()}!</span></h1>
              <p>" {motivQuote.current} "</p>
              <p>- Arif</p>
            </div>
            <ContinueLastActivityButton />
          </div>

          <MascotGreetings scale={isMobile ? 1.25 : 1.5} className={styles['mascot']} />
        </div>

        <div className={styles['material-container']}>
          <h1>Materi</h1>
          <LevelSlideArrow scroll={materialCardContainerScroll} onClick={_ => handleChevronClick(true)} left={true} />
          <LevelSlideArrow scroll={materialCardContainerScroll} scrollMax={materialCardContainer.current ? materialCardContainer.current.scrollLeftMax : 1000} onClick={_ => handleChevronClick(false)} left={false} />
          <div className={styles['material-card-container']} ref={materialCardContainer}>
            {materials.current.map(v => {
              const material = v();
              if(material.id > materialState.materialLevel)
                return <LockedMaterialCard key={material.id} material={material} />
              return <MaterialCard key={material.id} material={material} setWarn={setIsMaterialWarningVisible} isFin={material.id <= materialState.accomplishedMaterialLevel} />
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

function LevelSlideArrow({scroll, scrollMax, onClick, left}) {

  const isOutl = left ? scroll < 10 : scroll > scrollMax - 50;
  return (
    <img onClick={onClick} className={styles[`level-slide-arrow${left ? '' : '-r'}`]} src={isOutl ? ChevronHOutline : ChevronH} alt='' width='5' />
  )
}

function ContinueLastActivityButton({}) {

  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const msgFormat = useRef((_ => {
      const history = userState.history[0];
      let txt = "";

      switch(history.type) {
        case 'empty':
          if (materialState.materialLevel >= maximumMaterials) {
            txt = `Semua materi sudah kamu tuntaskan! Mari review materi secara acak!`;
            break;
          }
          txt = `Mari mulai Belajar ${getMaterials()[materialState.materialLevel]().title}!`;
          break;
        case 'material':
          txt = `Lanjut Bahas ${getMaterials()[history.data.material_id]().title}, gaskan!`;
          break;
        case 'quiz':
          txt = `Lanjutin Quiz ${getMaterials()[history.data.material.id]().title}, yuk!`;
          break;
      }
      return txt;
    })());

  const continueLastActivity = _ => {
    const history = userState.history[0];
    switch(history.type) {
      case 'empty':
        dispatch(addHistory({
          type: 'material',
          data: {
            material_id: materialState.materialLevel < maximumMaterials ? materialState.materialLevel : randomLength(maximumMaterials),
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

  return (
    <button className={styles['continue-activity-button']} onClick={continueLastActivity}>
      {msgFormat.current}
      <img src={ArrowGoPrimary} alt='' width='5' />
    </button>
  )
}

function MaterialCard({material, setWarn, isFin}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(stat => stat.user.value);

  const goToMaterial = _ => {
    dispatch(addHistory({
        type: 'material',
        data: {
          material_id: material.id,
        },
      }));
    navigate("/material");
  }

  const startMaterial = _ => {
    const history = userState.history[0];
    if (history.type === 'quiz') {
      setWarn({materialData:{material}, goTo:{goToMaterial}, visible:true});
      return;
    }
    
    goToMaterial();
  };

  return (
    <div className={`${styles['material-card']} ${isFin ? styles['material-card-fin'] : ''}`} onClick={startMaterial}>
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
    toast.error(
      `Tidak cukup level,
       Selesaikan kuis materi level sebelumnya.
      `,
      {
        icon: <img src={LockPrimary} alt='[LockIcon]' width='5' style={{height:'auto',width:'1.272rem', marginRight:'.618rem'}} />
      }
    );
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