import MascotThink from '/mascot/think.svg';
import PurpleX from '/PurpleX.svg';

import styles from './main.module.css';


export default function QuizInsufficientCoin({visible}) {

    const onQuit = _ => visible.set(false);

    return (<>
        <div className={`${styles["container"]} ${visible.val ? styles["visible"] : ''}`}>
            <div className={styles["content"]}>
                <a className={`${styles["btn"]} ${styles["quit"]}`} onClick={onQuit}>
                    <img src={PurpleX} alt='[quit]' width='25' />
                </a>
                
                <img className={styles['mascot']} src={MascotThink} alt='mascot thinking' width='25' />
                <h2>Maaf, Belum cukup!</h2>
                <p> Koinmu tidak cukup untuk memulai kuis, <br />
                    Kamu bisa tuntas-in miniquiz, <br />
                    Mempelajari materi lainnya, <br />
                    atau kelarin kuis materi lain untuk ngumpulin koin.
                </p>

                <a className={`${styles['btn']} ${styles['btn-primary']}`} onClick={onQuit}>
                    Siap!
                </a>
            </div>
        </div>
    </>)
}