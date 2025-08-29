import { lazy, Suspense, useRef } from "react"
import { randomLength } from "../glob/util"

const MascotWave = lazy(_ => import("./Animation/MascotWave"));
const MascotPlan = lazy(_ => import("./Animation/MascotPlan"));

import Loading from "./Loading"

export default function MascotGreetings({scale, className}) {

    const mascotComp = [
        <MascotWave scale={scale} className={className} />,
        <MascotPlan scale={scale*0.85} className={className} />,
    ];
    const rand = useRef(randomLength(mascotComp.length));

    return (
        <Suspense fallback={<Loading />}>
            {mascotComp[rand.current]}
        </Suspense>
    );
}