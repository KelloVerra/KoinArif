import { useEffect, useState } from 'react';
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

  const [greetings, setGreetings] = useState("");
  const [materials, setMaterials] = useState(getMaterials());


  // Render first time
  useEffect(_ => {

    // Time based greetings
    const hour = new Date().getHours();
    if (hour <= 9) setGreetings("Pagi");
    else if (hour <= 15) setGreetings("Siang");
    else if (hour <= 18) setGreetings("Sore");
    else setGreetings("Malam");

  }, []);

  return (
    <main>
      <div className={styles['content']}>
        <div className={styles['greetings-container']}>
          <div className={styles['greetings-content']}>
            <h1>Selamat <span style={{color:'var(--col-accent1)'}}>{greetings}</span>!</h1>
            <p>" Tunggu apa lagi? Yuk, luangkan waktu untuk belajar! "</p>
            <p>- Arif</p>
          </div>
          <ContinueLastActivityButton />
        </div>
        {/* Mascot here */}
        <div className={styles['material-container']}>
          <h1>Materi</h1>
          <div className={styles['material-card-container']}>
            {materials.map(v => {
              const material = v()();
              return <MaterialCard key={material.id} material={material} />
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

function ContinueLastActivityButton({}) {

  const continueLastActivity = _ => {
    
  };

  return (
    <button className={styles['continue-activity-button']} onClick={continueLastActivity}>Lanjut __</button>
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

// TODO: DEPRECATED
// function UserStat({}) {
//   const userState = useSelector(state => state.user.value);
//   const materialState = useSelector(state => state.material.value);

//   return (
//     <div className={styles["user-stat-container"]}>
//       <div className={styles["stat-container"]}>
//         <img src={budgetLogo} height="20px"/>
//         <p>{userState.budget} Budget</p>
//       </div>
//       <div className={styles["stat-container"]}>
//         <img src={materialLevelLogo} height="80px"/>
//         <p>Level {materialState.materialLevel+1}</p>
//       </div>
//     </div>
//   )
// }