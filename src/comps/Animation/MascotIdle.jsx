import { animate, createScope, createTimeline } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotbody from '/mascot/idle/body.svg';
import mascotcoin from '/mascot/idle/coin.svg';
import mascoteye from '/mascot/idle/eye.svg';


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
        eye: {
            style:{ left: 0, top: 0, width: '100%'},
        },
    }
    const coin = useRef(null);
    const eye = useRef(null);

    const explicitContainerStyle = {
        width: `${9 * scale}rem`,
        height: `${12 * scale}rem`,
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
        });

        const timeline = createTimeline({
            defaults: {
                duration: 5,
                ease: 'steps(1)',
            },
            loop: true,
        });
        const blink = _ => {
            timeline.add(eye.current, {
                y: '10%',
                scaleY: 0,
                ease: 'inCirc',
                duration: 100,
            });
            timeline.add(eye.current, {
                y: '-2%',
                scaleY: 1.125,
                ease: 'outBack',
                duration: 100,
            });
        }

        timeline.add(eye.current, {
            x: 0,
            y: 0,
            duration: 1000,
        });
        timeline.add(eye.current, {
            x: '-10%',
            y: '-2%',
            scaleY: 1.125,
            ease: 'outCirc',
            duration: 500,
        });
        timeline.add(eye.current, {
            opacity: 1,
            duration: 750,
        });
        blink();
        blink();
        timeline.add(eye.current, {
            opacity: 1,
            duration: 1500,
        });
        blink();
        timeline.add(eye.current, {
            opacity: 1,
            duration: 1000,
        });
        timeline.add(eye.current, {
            x: 0,
            y: 0,
            scaleY: 1,
            ease: 'outCirc',
            duration: 1000,
        });
        blink();

        return _ => {
            timeline.revert();
            scope.current.revert();
        };
    }, [scale]);



    return (
        <div style={explicitContainerStyle} className={`${mainStyles['container']} ${className}`} ref={root}>
            <img src={mascotcoin} ref={coin} width="80" style={ partsData.coin.style } alt=''/>
            <img src={mascotbody} width="80" style={ partsData.body.style } alt=''/>
            <img src={mascoteye} ref={eye} width="80" style={ partsData.eye.style } alt=''/>
        </div>
    );
}