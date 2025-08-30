import { lazy, Suspense, useRef } from "react"
import { randomLength } from "../glob/util"

const MascotCelebrate = lazy(_ => import("./Animation/MascotCelebrate"));
const MascotAdmire = lazy(_ => import("./Animation/MascotAdmire"));
const MascotNerd = lazy(_ => import("./Animation/MascotNerd"));

import Loading from "./Loading"

export default function MascotQuizComplete({scale, className}) {

    const mascotComp = useRef([
        <MascotAdmire scale={1*scale} className={className} />,
        <MascotNerd scale={scale*0.9} className={className} />,
        <MascotCelebrate scale={1.125*scale} className={className} />,
    ]);
    const rand = useRef(randomLength(mascotComp.current.length));

    return (
        <Suspense fallback={<Loading />}>
            {mascotComp.current[rand.current]}
        </Suspense>
    );
}