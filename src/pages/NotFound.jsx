
// Components
import { useNavigate } from 'react-router'
import Footer from '../comps/Footer'

import styles from './NotFound.module.css'
import notFoundArtBG from '/NotFoundArt.svg'
import notFoundArtFG from '/NotFoundArtFG.svg'



export default function NotFound() {

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles['content']}>
        <div className={styles['splash-container']}>
          <img className={styles['splash-bg']} src={notFoundArtBG} />
          <img className={styles['splash-fg']} src={notFoundArtFG} />
        </div>
        <button className={styles['back-button']} onClick={goToHome}>Kembali</button>
      </div>
    </>
  )
}
