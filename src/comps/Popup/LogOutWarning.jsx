
import MascotThink from '/mascot/think.svg';
import PurpleX from '/PurpleX.svg';

import { useNavigate } from 'react-router';
import { resetStore } from '../../glob/state';

import styles from './main.module.css';


export default function MaterialWarning({visible}) {

    const navigate = useNavigate();

    const onQuit = _ => visible.set(false);
    const quitLearning = _ => {
        resetStore();
        navigate("/");
        onQuit();
    }

    return (<>
        <div className={`${styles["container"]} ${visible.val ? styles["visible"] : ''}`}>
            <div className={styles["content"]}>
                <a className={`${styles["btn"]} ${styles["quit"]}`} onClick={onQuit}>
                    <img src={PurpleX} alt='[quit]' width='25' />
                </a>
                
                <img className={styles['mascot']} src={MascotThink} alt='mascot thinking' width='25' />
                <h2>Tunggu Dulu!</h2>
                <p> Seluruh progress-mu akan hilang! <br />
                    Apakah kamu yakin ingin log out?
                </p>

                <a className={`${styles['btn']} ${styles['btn-secondary']}`} onClick={quitLearning}>
                    Aku ingin Log Out
                </a>
                <a className={`${styles['btn']} ${styles['btn-primary']}`} onClick={onQuit}>
                    Nggak jadi deh
                </a>
            </div>
        </div>
    </>)
}