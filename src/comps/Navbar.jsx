import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, setUserHasStarted } from '../glob/state';

import styles from './Navbar.module.css'

import logo from '/CompactLogo.svg'
import budgetLogo from '/Budget3D.svg'
import materialLevelLogo from '/Level.svg'



export default function Navbar() {
  const userState = useSelector(state => state.user.value);

  return (
    <header>
      <div className={styles["content"]}>
        <img className={styles["logo"]} alt='logo' src={logo} height="20"/>
        {userState.hasStarted ? <LoggedIn /> : <LoggedOut />}
      </div>
    </header>
  )
}


function LoggedOut({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startLearning = () => dispatch(setUserHasStarted(true));

  const goToCredits = () => {
    navigate("/credit");
  };

  return (
    <div className={styles["right-content"]}>
      <a className={styles["credits"]} onClick={goToCredits}>Kredit & Atribusi</a>
      <a className={styles["start"]} onClick={startLearning}>Mulai Belajar</a>
    </div>
  )
}


function LoggedIn({}) {
  const navigate = useNavigate();

  const quitLearning = () => resetStore();

  const goToCredits = () => {
    navigate("/credit");
  };

  return (
    <div className={styles["right-content"]}>
      <UserStat />
      <a className={styles["credits"]} onClick={goToCredits}>Kredit & Atribusi</a>
      <a className={styles["quit"]} onClick={quitLearning}>Log Out</a>
    </div>
  )
}


function UserStat({}) {
  const userState = useSelector(state => state.user.value);
  const materialState = useSelector(state => state.material.value);

  return (
    <div className={styles["user-stat-container"]}>
      <div className={styles["stat-container"]}>
        <img src={budgetLogo} alt="coinLogo" height="20" />
        <p>{userState.budget} Koin</p>
      </div>
      <div className={styles["stat-container"]}>
        <img src={materialLevelLogo} alt="levelLogo" height="20" />
        <p>Level {materialState.materialLevel+1}</p>
      </div>
    </div>
  )
}