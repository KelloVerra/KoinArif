import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, setUserHasStarted } from '../glob/state';

import styles from './Footer.module.css'

import logo from '/CompactLogo.svg'
import budgetLogo from '/Budget3D.svg'
import materialLevelLogo from '/Level.svg'





export default function Footer() {
  const userState = useSelector(state => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startLearning = () => dispatch(setUserHasStarted(true));
  const quitLearning = () => resetStore();

  const goToCredits = () => {
    navigate("/credit");
  };

  return (
    <footer>
      <div className={styles['content']}>
        <div className={styles['upper']}>
          <img className={styles["logo"]} src={logo}/>
          <p>Koin Arif adalah platform financial education yang dapat mengasah pengetahuan literasimu dalam cara yang menyenangkan dan engaging.</p>
        </div>
        { userState.hasStarted ?
          <a className={styles['quit']} onClick={quitLearning}>Keluar</a> :
          <a className={styles['start']} onClick={startLearning}>Mulai Belajar</a>
        }
        <hr />
        <div className={styles['lower']}>
          <a className={styles['credits']} onClick={goToCredits}>Kredit & Atribusi</a>
          <p>IntechFest 2025 Web Design Competition Submission</p>
        </div>
      </div>
    </footer>
  )
}
