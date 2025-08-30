import { lazy, Suspense, useRef } from "react"
import { randomLength } from "../glob/util"

const MascotWave = lazy(_ => import("./Animation/MascotWave"));
const MascotPlan = lazy(_ => import("./Animation/MascotPlan"));
const MascotCelebrate = lazy(_ => import("./Animation/MascotCelebrate"));
const MascotAdmire = lazy(_ => import("./Animation/MascotAdmire"));
const MascotNerd = lazy(_ => import("./Animation/MascotNerd"));

import Loading from "./Loading"

export default function MascotGreetings({scale, className}) {

    const mascotComp = [
        <MascotWave scale={scale} className={className} />,
        <MascotPlan scale={scale*0.85} className={className} />,
        <MascotCelebrate scale={scale*1.075} className={className} />,
        <MascotAdmire scale={scale} className={className} />,
        <MascotNerd scale={scale*0.9} className={className} />,
    ];
    const rand = useRef(randomLength(mascotComp.length));

    return (
        <Suspense fallback={<Loading />}>
            {mascotComp[rand.current]}
        </Suspense>
    );
}