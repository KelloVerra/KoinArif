import { animate, createScope, createTimeline } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotbody from '/mascot/admire/body.svg';
import mascotcoin from '/mascot/admire/coin.svg';
import mascoteye from '/mascot/admire/eye.svg';


export default function MascotIdle({scale, className}) {

    const partsData = {
        body: {
            style:{ left: 0, top: 0, width: '100%' },
        },
        coin: {
            style:{ left: 0, top: 0, width: '100%' },
            keyframes: [
                { y: '8%'   , ease: 'inOutSine' , duration:1000 },
                { y: 0      , ease: 'inOutSine' , duration:1000 },
            ],
        },
        eye0: {
            style:{ left: 0, top: 0, width: '100%'},
            keyframes: [
                { scaleY: '80%'     , scaleX: '80%'     ,y: '2.25%'    , ease: 'inOutSine' , duration:0 },
                { scaleY: '100%'    , scaleX: '100%'    ,y: '0%'    , ease: 'inOutSine' , duration:250 },
                { scaleY: '80%'     , scaleX: '80%'     ,y: '2.25%'    , ease: 'inOutSine' , duration:250 },
            ],
        },
        eye1: {
            style:{ left: 0, top: 0, width: '100%'},
            keyframes: [
                { scaleY: '80%'     , scaleX: '80%'     ,y: '2.25%'     , x: '24%'  , ease: 'inOutSine' , duration:0 },
                { scaleY: '100%'    , scaleX: '100%'    ,y: '0%'        , x: '19%'  , ease: 'inOutSine' , duration:250 },
                { scaleY: '80%'     , scaleX: '80%'     ,y: '2.25%'     , x: '24%'  , ease: 'inOutSine' , duration:250 },
            ],
        },
    }
    const coin = useRef(null);
    const eye0 = useRef(null);
    const eye1 = useRef(null);

    const explicitContainerStyle = {
        width: `${9 * scale}rem`,
        height: `${9.95 * scale}rem`,
    };

    const scope = useRef(null);
    const root = useRef(null);
    useEffect(_ => {
        
        scope.current = createScope({ root }).add(_ => {
            animate(coin.current, {
                keyframes: partsData.coin.keyframes,
                loop: true,
                loopDelay: 0
            });
            animate(eye0.current, {
                keyframes: partsData.eye0.keyframes,
                loop: true,
                loopDelay: 0
            });
            animate(eye1.current, {
                keyframes: partsData.eye1.keyframes,
                loop: true,
                loopDelay: 0
            });
        });

        return _ => scope.current.revert();
    }, [scale]);



    return (
        <div style={explicitContainerStyle} className={`${mainStyles['container']} ${className}`} ref={root}>
            <img src={mascotcoin} ref={coin} width="80" style={ partsData.coin.style } alt=''/>
            <img src={mascotbody} width="80" style={ partsData.body.style } alt=''/>
            <img src={mascoteye} ref={eye0} width="80" style={ partsData.eye0.style } alt=''/>
            <img src={mascoteye} ref={eye1} width="80" style={ partsData.eye1.style } alt=''/>
        </div>
    );
}