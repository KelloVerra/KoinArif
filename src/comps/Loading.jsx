import styles from './Loading.module.css'
import icon from '/Loading.svg';

export default function Loading({style}) {
    return (<div className={styles["container"]} style={style}>
        <img src={icon} alt="" width="20" />
    </div>);    
}