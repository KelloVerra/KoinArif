import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { setUserHasStarted } from '../glob/state'
import './Landing.css'

// Components
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'

export default function Landing() {
  const userState = useSelector(stat => stat.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLearning = () => dispatch(setUserHasStarted(true));

  const goToCredits = () => {
    navigate("/credit");
  };

  return (
    <>
      <Navbar />
      <main>
        <h1>Pengalaman Literasi Finansial Dibikin seru.</h1>
        <h2>Bersama Koin Arif, mari mengasah pengetahuan literasimu dengan cara yang menyenangkan.</h2>
        <button onClick={startLearning}>Mulai belajar</button>
        <button onClick={goToCredits}>Kredit & Atribusi</button>
      </main>
      <Footer />
    </>
  )
}
