import { useDispatch, useSelector } from 'react-redux'

import { setUserHasStarted } from '../glob/state'
import styles from  './Landing.module.css'
import { lazy, Suspense, useEffect, useState } from 'react';
import Loading from '../comps/Loading';
import MascotPhone from '../comps/Animation/MascotPhone';

const MascotWave = lazy(_ => import('../comps/Animation/MascotWave'));
const MascotPlan = lazy(_ => import('../comps/Animation/MascotPlan'));
const MascotHero = lazy(_ => import('../comps/Animation/MascotHero'));

export default function Landing() {
  const userState = useSelector(stat => stat.user.value);
  const dispatch = useDispatch();

  const startLearning = () => dispatch(setUserHasStarted(true));

  const checkMobile = _ => window.innerWidth < 725;
  const [isMobile, setIsMobile] = useState(checkMobile());
  useEffect(_ => {
    const handle = _ => setIsMobile(checkMobile());
    window.addEventListener('resize', handle);
    return _ => window.removeEventListener('resize', handle);
  }, []);
  

  return (
    <main>
      <div className={styles['content']}>
        <div className={styles['hero']}>
          <div className={styles['herotextart']}>
            <Suspense fallback={<Loading />}>
              <MascotHero scale={isMobile ? 2 : 2.75} className={styles['hero-mascot']} />
            </Suspense>
            <h1>Literasi Finansial<br/>
                <span className={styles['gradient-heading']}>Dibikin seru</span>
            </h1>
            <p> Bersama Koin Arif, mari mengasah pengetahuan literasimu sambil yang bersenang-senang! </p>
            <button className={styles['start-button']} onClick={startLearning}>Mulai Belajar</button>
          </div>
        </div>


        <section className={styles['section0']}>
          <div>
            <h2>
              Siapkah <br />
              kamu dengan <br />
              <span className={styles['gradient-heading']}>Masa Depanmu?</span>
            </h2>
            <p>
              Banyak hal yang sulit diprediksi seiring jaman.
              Sudah yakin keadaan finansialmu pasti aman
              kedepannya?
            </p>
          </div>
          <Suspense fallback={<Loading />}>
            <MascotPlan scale={1.85} />
          </Suspense>
        </section>

        <section className={styles['section1']}>
          <div>
            <h2>
              Berharap <br />
              Belajar serasa <br/> 
              <span className={styles['gradient-heading']}>Scrolling Sosmed?</span>
            </h2>
            <p>
              Andai mengasah literasi finansial gak ngebosenin
              dan bikin pusing seperti belajar matematika di
              sekolah..
            </p>
          </div>
          <Suspense fallback={<Loading />}>
            <MascotPhone scale={1.65} />
          </Suspense>
        </section>

        <section className={styles['section2']}>
          <div>
            <p className={styles['text-intro']}>Salam Kenal..</p>
            <h1>
              Namaku <br />
              <span className={styles['gradient-heading']}>Arif</span>
            </h1>
            <p>
              Aku siap nemenin kamu mengasah 
              <span style={{color:'var(--col-accent1)'}}> kemampuan literasimu!</span>
            </p>
            <p style={{
              marginTop: '1.618rem',
            }}>
              Ayo, langsung aja mulai petualangan 
              <span style={{color:'var(--col-accent1)'}}> finansial kita!</span>
            </p>
          </div>
          <Suspense fallback={<Loading />}>
            <MascotWave scale={2} />
          </Suspense>
        </section>
        <button className={styles['start-button']} onClick={startLearning}>Mulai Belajar</button>
      </div>
    </main>
  )
}