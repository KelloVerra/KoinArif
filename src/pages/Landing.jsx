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

  return (
    <main>
      <div>
        <h1>Pengalaman Literasi Finansial Dibikin seru.</h1>
        <h2>Bersama Koin Arif, mari mengasah pengetahuan literasimu dengan cara yang menyenangkan.</h2>
      </div>
      <StartLearningButton startLearning={startLearning} />


      <div>
        <h1>Siapkah kamu dengan Masa Depanmu?.</h1>
        <h2>Banyak hal yang sulit diprediksi seiring jaman. Sudah yakin keadaan finansialmu pasti aman kedepannya?</h2>
      </div>

      <div>
        <h1>Berharap agar Belajar serasa Scrolling Sosmed?</h1>
        <h2>Andai mengasah literasi finansial gak ngebosenin dan bikin pusing seperti belajar matematika di sekolah.</h2>
      </div>

      <div>
        <h1>Salam Kenal.. Namaku Arif</h1>
        <h2>Aku siap nemenin kamu mengasah kemampuan literasimu!</h2>
        <h2>Ayo, langsung aja mulai petualangan finansial kita!</h2>
      </div>

      <StartLearningButton startLearning={startLearning} />
    </main>
  )
}

function StartLearningButton({startLearning}) {
  return (
    <button onClick={startLearning}>Mulai belajar</button>
  );
}