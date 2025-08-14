import { useState } from 'react'

import styles from './CreditsAttributions.module.css'

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
      <div className={styles['content']}>
        <h1 className={styles['title']}>Kredit <span style={{fontFamily:'var(--paragraph-font)',fontWeight:200}}>&</span> Atribusi</h1>
        <div className={styles['grid']}>
          <div className={styles['item']}>
            <h2>Profil Pembuat</h2>
            <p> I Wayan Widhyadana Sadhu Gunawan (Yana) <br/>
                Bersekolah di SMKN 1 Denpasar, sebagai jurusan Rekayasa Perangkat Lunak.
            </p>
          </div>
          <div className={styles['item']}>
            <h2>Font</h2>
            <p>Days One<br/>Kodchasan</p>
          </div>
          <div className={`${styles['item']} ${styles['wide-item']}`}>
            <h2>Aset, Gambar, Ikon & Ilustrasi</h2>
            <p>HeroIcon</p>
          </div>
        </div>
        <button className={styles['back-button']} onClick={goToHome}>Kembali</button>
      </div>
    </>
  )
}
