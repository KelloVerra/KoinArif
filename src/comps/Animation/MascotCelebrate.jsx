import { animate, createScope } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotbody from '/mascot/celebrate/body.svg';
import mascotcoin from '/mascot/celebrate/coin.svg';
import mascotfeet from '/mascot/celebrate/feet.svg';
import mascotdeco from '/mascot/celebrate/deco.svg';


export default function MascotCelebrate({scale, className}) {

    const partsData = {
        body: {
            style:{ left: 0, top: 0, width: '100%' },
        },
        feet: {
            style:{ left: 0, top: 0, width: '100%' },
            keyframes: [
                {y:    0,               x: '-6%'    ,  ease: 'linear'  , duration: 0},
                {y: `${10/3}%`,         x: '-5%',  ease: 'in'      , duration: 250},
                {y: `${10/3*2}%`,       x: '2%',  ease: 'in'      , duration: 75},
                {y: `${10}%`,           x: '7%'    ,  ease: 'outSine' , duration: 250},
            ]
        },
        coin: {
            style:{ left: 0, top: 0, width: '100%' },
            keyframes: [
                { y: '8%'   , ease: 'inOutSine' , duration:1000 },
                { y: 0      , ease: 'inOutSine' , duration:1000 },
            ],
        },
        deco: {
            style:{ left: 0, top: 0, width: '100%'},
            keyframes: [
                { y: '6%', rotate: '-15deg' , duration:500 },
                { y: 0   , rotate: '0' , duration:500 },
            ],
        },
    }
    const coin = useRef(null);
    const feet = useRef(null);
    const deco = useRef(null);

    const explicitContainerStyle = {
        width: `${9 * scale}rem`,
        height: `${9.25 * scale}rem`,
    };

    const scope = useRef(null);
    const root = useRef(null);
    useEffect(_ => {
        
        scope.current = createScope({ root }).add(_ => {
            animate(coin.current, {
                keyframes: partsData.coin.keyframes,
                loop: true,
            });
            animate(feet.current, {
                keyframes: partsData.feet.keyframes,
                loop: true,
                alternate: true,
            });
            animate(deco.current, {
                keyframes: partsData.deco.keyframes,
                loop: true,
                ease: 'steps(1)',
            });
        });

        return _ => scope.current.revert();
    }, [scale]);



    return (
        <div style={explicitContainerStyle} className={`${mainStyles['container']} ${className}`} ref={root}>
            <img src={mascotcoin} ref={coin} width="80" style={ partsData.coin.style } alt=''/>
            <img src={mascotbody} width="80" style={ partsData.body.style } alt=''/>
            <img src={mascotfeet} ref={feet} width="80" style={ partsData.feet.style } alt=''/>
            <img src={mascotdeco} ref={deco} width="80" style={ partsData.deco.style } alt=''/>
        </div>
    );
}