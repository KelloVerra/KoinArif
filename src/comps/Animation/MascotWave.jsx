import { animate, createScope, createSpring } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotbody from '/mascot/wave/body.svg';
import mascotfeet from '/mascot/wave/feet.svg';
import mascotcoin from '/mascot/wave/coin.svg';


export default function MascotWave({scale, className}) {

    const partsData = {
        body: {
            style:{ left: 0, top: "8%", width: '95%' },
        },
        feet: {
            style:{ left: '55%', top: '55%', width: '21%' },
            keyframes: [
                {y:    0,               x: 0    ,  ease: 'linear'  , duration: 0},
                {y: `${-65/3}%`,        x: '25%',  ease: 'in'      , duration: 300},
                {y: `${-65/3*2}%`,      x: '25%',  ease: 'in'      , duration: 75},
                {y: `${-65}%`,          x: 0    ,  ease: 'outSine' , duration: 300},
            ]
        },
        coin: {
            style:{ left: '37%', top: '-15%', width: '35%' },
            keyframes: [
                { y: '35%'      , ease: 'inOutSine' , duration:1000 },
                { y: 0          , ease: 'inOutSine' , duration:1000 },
            ]
        },
    }
    const coin = useRef(null);
    const feet = useRef(null);

    const explicitContainerStyle = { width: `${9.5 * scale}rem`, height: `${10 * scale}rem` };

    const scope = useRef(null);
    const root = useRef(null);
    useEffect(_ => {
        if (scale === 0) return;
        scope.current = createScope({ root }).add(_ => {
            
            animate(coin.current, {
                keyframes: partsData.coin.keyframes,
                loop: true,
                loopDelay: 0
            });

            animate(feet.current, {
                keyframes: partsData.feet.keyframes,
                loop: true,
                loopDelay: 0,
                alternate: true,
            });

        });

        return _ => scope.current.revert();
    }, [scale]);



    return (<div style={explicitContainerStyle} className={`${mainStyles['container']} ${className}`} ref={root}>
        <img src={mascotcoin} ref={coin} width="80" style={ partsData.coin.style } alt=''/>
        <img src={mascotbody} width="80" style={ partsData.body.style } alt=''/>
        <img src={mascotfeet} ref={feet} width="80" style={ partsData.feet.style } alt=''/>
    </div>);
}