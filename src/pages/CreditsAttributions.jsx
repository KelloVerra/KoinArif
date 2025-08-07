import { useState } from 'react'

// import './CreditsAttributions.css'

// Components
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'
import { useNavigate } from 'react-router';

export default function CreditsAttributions() {

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  return (
    <>
      <h1>Credits</h1>
      <button onClick={goToHome}>Kembali</button>
    </>
  )
}
