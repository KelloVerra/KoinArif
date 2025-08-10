import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resetStore, setUserHasStarted } from '../glob/state';

import './Footer.css'

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
      <div className="content">
        <div className='upper'>
          <img className="logo" src={logo}/>
          <p>Koin Arif adalah platform financial education yang dapat mengasah pengetahuan literasimu dalam cara yang menyenangkan dan engaging.</p>
        </div>
        { userState.hasStarted ?
          <button className='quit-button' onClick={quitLearning}>Keluar</button> :
          <button className='start-button' onClick={startLearning}>Mulai Belajar</button>
        }
        <hr />
        <div className='lower'>
          <button className='credit' onClick={goToCredits}>Kredit & Atribusi</button>
          <p>IntechFest 2025 Web Design Competition Submission</p>
        </div>
      </div>
    </footer>
  )
}
