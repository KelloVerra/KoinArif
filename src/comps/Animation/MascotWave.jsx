import { animate, createScope, createSpring } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotbody from '/mascot/wave/body.svg';
import mascotfeet from '/mascot/wave/feet.svg';
import mascotcoin from '/mascot/wave/coin.svg';


export default function MascotWave({containerStyle, scale}) {

    const partsData = {
        body: {
            style:{ left: 0 *scale, top: 35 *scale, width: 150 *scale },
        },
        feet: {
            style:{ left: 85 *scale, top: 120 *scale, width: 35 *scale },
            keyframes: [
                {y: 0,          x: 0 ,  ease: 'linear'  , duration: 0},
                {y: -35/3,      x: 12 , ease: 'in'      , duration: 300},
                {y: -35/3*2,    x: 12 , ease: 'in'      , duration: 75},
                {y: -35,        x: 0 ,  ease: 'outSine' , duration: 300},
            ]
        },
        coin: {
            style:{ left: 45 *scale, top: 0 *scale, width: 55 *scale },
            keyframes: [
                { y: 15 *scale  , ease: 'inOutSine' , duration:1000 },
                { y: 0 *scale   , ease: 'inOutSine' , duration:1000 },
            ]
        },
    }
    const coin = useRef(null);
    const feet = useRef(null);

    const explicitContainerStyle = { width: `${12 * scale}rem`, };

    const scope = useRef(null);
    const root = useRef(null);
    useEffect(_ => {
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



    return (<div style={{...explicitContainerStyle, ...containerStyle}} className={mainStyles['container']} ref={root}>
        <img src={mascotcoin} ref={coin} width="20" style={ partsData.coin.style } alt=''/>
        <img src={mascotbody} width="20" style={ partsData.body.style } alt=''/>
        <img src={mascotfeet} ref={feet} width="20" style={ partsData.feet.style } alt=''/>
    </div>);
}