import { useEffect, useState } from "react";

export const randomLength = len => Math.floor(Math.random() * (len));



export const capitalizeFirstLetter = v => {
    const st = v.charAt(0).toUpperCase();
    return `${st}${v.slice(1)}`;
}



export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;




export const useIsMobile = (lim = 725) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < lim);

    useEffect(_ => {
        const handle = _ => {
            setIsMobile(window.innerWidth < 725);
        };
        window.addEventListener('resize', handle);
        return _ => window.removeEventListener('resize', handle);
    }, []);

    return isMobile;
}