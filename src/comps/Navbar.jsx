import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, setUserHasStarted } from '../glob/state';

import './Navbar.css'

import logo from '/CompactLogo.svg'
import budgetLogo from '/Budget3D.svg'
import materialLevelLogo from '/Level.svg'



export default function Navbar() {
  const userState = useSelector(state => state.user.value);

  return (
    <header>
      <div className="content">
        <img className="logo" src={logo}/>
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
    <div className="right-content">
      <button className="credits" onClick={goToCredits}>Kredit & Atribusi</button>
      <button className="start-button" onClick={startLearning}>Mulai Belajar</button>
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
    <div className="right-content">
      <UserStat />
      <button className="credits" onClick={goToCredits}>Kredit & Atribusi</button>
      <button className="quit-button" onClick={quitLearning}>Keluar</button>
    </div>
  )
}


function UserStat({}) {
  const userState = useSelector(state => state.user.value);
  const materialState = useSelector(state => state.material.value);

  return (
    <div className="user-stat-container">
      <div className='stat-container'>
        <img src={budgetLogo} />
        <p>{userState.budget} Budget</p>
      </div>
      <div className='stat-container'>
        <img src={materialLevelLogo} />
        <p>Level {materialState.materialLevel+1}</p>
      </div>
    </div>
  )
}