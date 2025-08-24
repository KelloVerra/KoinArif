export const randomLength = len => Math.floor(Math.random() * (len));

export const capitalizeFirstLetter = v => {
    const st = v.charAt(0).toUpperCase();
    return `${st}${v.slice(1)}`;
}

export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;