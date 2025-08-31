import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUserHasStarted } from '../glob/state';

import styles from './Navbar.module.css'

import logo from '/CompactLogo.svg'
import budgetIcon from '/Budget3D.svg'
import materialLevelIcon from '/Level.svg'



export default function Navbar({setLogOutWarnVisible}) {
  const userState = useSelector(state => state.user.value);
  const navigate = useNavigate();

  const navRef = useRef(null);
  useEffect(_ => {
    const handle = _ => {
      if(navRef) {
        navRef.current.classList.toggle(styles['has-scrolled'], window.scrollY > 5)
      }
    };
    window.addEventListener('scroll', handle);

    return _ => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <header ref={navRef}>
      <div className={styles["content"]}>
        <img className={styles["logo"]} alt='logo koin arif' src={logo} width="20" onClick={_=>navigate("/")} draggable="false" />
        {userState.hasStarted ? <LoggedIn warn={setLogOutWarnVisible} /> : <LoggedOut />}
      </div>
    </header>
  )
}


function LoggedOut({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startLearning = useCallback(_ => dispatch(setUserHasStarted(true)), []);

  const goToCredits = useCallback(_ => {
    navigate("/credit");
  }, []);

  return (
    <div className={styles["right-content"]}>
      <a className={styles["start"]} onClick={startLearning}>Mulai Belajar</a>
    </div>
  )
}


function LoggedIn({warn}) {
  return (
    <div className={styles["right-content"]}>
      <UserStat />
      <a className={styles["quit"]} onClick={_ => warn(true)}>Log Out</a>
    </div>
  )
}


function UserStat({}) {
  const userState = useSelector(state => state.user.value);
  const materialState = useSelector(state => state.material.value);

  return (
    <div className={styles["user-stat-container"]}>
      <div className={styles["stat-container"]}>
        <img src={budgetIcon} alt="[coinIcon]" width="20" />
        <p>{userState.budget} Koin</p>
      </div>
      <div className={styles["stat-container"]}>
        <img src={materialLevelIcon} alt="[levelIcon]" width="20" />
        <p>Level {materialState.materialLevel+1}</p>
      </div>
    </div>
  )
}