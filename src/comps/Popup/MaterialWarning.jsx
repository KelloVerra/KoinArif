import { useSelector } from 'react-redux';

import MascotThink from '/mascot/think.svg';
import PurpleX from '/PurpleX.svg';

import styles from './main.module.css';
import { getMaterialByIndex } from '../../glob/materials/main';
import { useNavigate } from 'react-router';



export default function MaterialWarning({visible, goToMaterial}) {

    const onQuit = _ => visible.set(prev => {return {...prev, visible:false}});
    const userState = useSelector(stat => stat.user.value);
    const history = userState.history[0];
    const material = visible.val.materialData.material ? visible.val.materialData.material : {title: ''};

    const navigate = useNavigate();
    const goToQuiz = _ => navigate('/quiz');

    return (<>
        <div className={`${styles["container"]} ${visible.val.visible ? styles["visible"] : ''}`}>
            <div className={styles["content"]}>
                <a className={`${styles["btn"]} ${styles["quit"]}`} onClick={onQuit}>
                    <img src={PurpleX} alt='[quit]' width='25' />
                </a>
                
                <img className={styles['mascot']} src={MascotThink} alt='mascot thinking' width='25' />
                <h2>Tunggu Dulu!</h2>
                <p> Kamu sebelumnya sedang mengerjakan kuis nih, <br />
                    Apakah kamu ingin melanjutkannya?
                </p>

                <a className={`${styles['btn']} ${styles['btn-primary']}`} onClick={goToQuiz}>
                    Lanjut mengerjakan kuis {getMaterialByIndex(history.data.material ? history.data.material.id : 0).title}
                </a>
                <a className={`${styles['btn']} ${styles['btn-secondary']}`} onClick={goToMaterial.goToMaterial}>
                    Lupakan kuis sebelumnya, aku ingin belajar {material.title}
                </a>
            </div>
        </div>
    </>)
}