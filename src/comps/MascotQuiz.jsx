import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { randomLength } from "../glob/util"

const MascotCelebrate = lazy(_ => import('../comps/Animation/MascotCelebrate.jsx'));
const MascotAdmire = lazy(_ => import("./Animation/MascotAdmire"));

const MascotIdle = lazy(_ => import('../comps/Animation/MascotIdle.jsx'));

const MascotSurprised = lazy(_ => import('../comps/Animation/MascotSurprised.jsx'));

import styles from '../pages/QuizPage.module.css';
import Loading from "./Loading"



export default function MascotQuiz({scale, state}) {

    const randomSelect = useRef(0);
    const mascotComponents = _ => [
        _ => <MascotIdle scale={scale} className={styles['quiz-mascot']} />,
        _ => [
            <MascotCelebrate scale={scale * 1.25} className={styles['quiz-mascot']} />,
            <MascotAdmire scale={scale * 1.20} className={styles['quiz-mascot']} />,
        ][randomSelect.current],
        _ => <MascotSurprised scale={scale * 1} className={styles['quiz-mascot']} />,
    ];
    const [selMascot, setSelMascot] = useState(mascotComponents()[state]())

    useEffect(_ => {
        randomSelect.current = randomLength(2);
        setSelMascot(mascotComponents()[state]());
    }, [state]);

    return (
        <Suspense fallback={<Loading />}>
            {selMascot}
        </Suspense>
    );
}