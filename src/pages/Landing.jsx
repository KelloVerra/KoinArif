import { useDispatch, useSelector } from 'react-redux'

import { setUserHasStarted } from '../glob/state'
import styles from  './Landing.module.css'
import { lazy, Suspense } from 'react';
import Loading from '../comps/Loading';
import MascotPhone from '../comps/Animation/MascotPhone';

const MascotWave = lazy(_ => import('../comps/Animation/MascotWave'));
const MascotPlan = lazy(_ => import('../comps/Animation/MascotPlan'));
const MascotHero = lazy(_ => import('../comps/Animation/MascotHero'));

export default function Landing() {
  const userState = useSelector(stat => stat.user.value);
  const dispatch = useDispatch();

  const startLearning = () => dispatch(setUserHasStarted(true));

  return (
    <main>
      <div className={styles['content']}>
        <div className={styles['hero']}>
          <Suspense fallback={<Loading />}>
            <MascotHero scale={2} />
          </Suspense>
          <div className={styles['herotextart']}>
            <h1>Pengalaman<br/>&nbsp;&nbsp;Literasi Finansial<br/>&nbsp;&nbsp;&nbsp;<span style={{color:'var(--col-accent1)'}}>Dibikin seru.</span></h1>
            <p>Bersama Koin Arif, mari mengasah pengetahuan literasimu dengan cara yang menyenangkan.</p>
          </div>
          <StartLearningButton startLearning={startLearning} isHero={true} />
        </div>


        <div className={styles['textart0']}>
          <Suspense fallback={<Loading />}>
            <MascotPlan scale={1.5} />
          </Suspense>
          <h1>Siapkah kamu dengan Masa Depanmu?</h1>
          <p>Banyak hal yang sulit diprediksi seiring jaman. Sudah yakin keadaan finansialmu pasti aman kedepannya?</p>
        </div>

        <div className={styles['textart1']}>
          <Suspense fallback={<Loading />}>
            <MascotPhone scale={1.325} />
          </Suspense>
          <h1>Berharap agar Belajar serasa Scrolling Sosmed?</h1>
          <p>Andai mengasah literasi finansial gak ngebosenin dan bikin pusing seperti belajar matematika di sekolah.</p>
        </div>

        <div className={styles['textart2']}>
          <Suspense fallback={<Loading />}>
            <MascotWave scale={1.325} />
          </Suspense>
          <h1>Salam Kenal.. Namaku Arif</h1>
          <p>Aku siap nemenin kamu mengasah kemampuan literasimu!</p>
          <p>Ayo, langsung aja mulai petualangan finansial kita!</p>
        </div>

        <StartLearningButton startLearning={startLearning} isHero={false} />
      </div>
    </main>
  )
}

function StartLearningButton({startLearning, isHero}) {
  return (
    <button className={styles[isHero ? 'hero-start-button' : 'start-button']} onClick={startLearning}>Mulai Belajar</button>
  );
}