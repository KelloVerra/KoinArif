import { animate, createScope, createTimeline } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotbody from '/mascot/nerd/body.svg';
import mascotcoin from '/mascot/nerd/coin.svg';
import mascotglasses0 from '/mascot/nerd/glasses0.svg';
import mascotglasses1 from '/mascot/nerd/glasses1.svg';


export default function MascotNerd({scale, className}) {

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
        glasses0: {
            style:{ left: 0, top: 0, width: '100%'},
        },
        glasses1: {
            style:{ left: 0, top: 0, width: '100%', opacity: 0},
        },
    }
    const coin = useRef(null);
    const glasses0 = useRef(null);
    const glasses1 = useRef(null);

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
                duration: 3,
                ease: 'steps(1)',
            },
            loop: true,
        })
        .add(glasses0.current, {
            x: 0,
            y: 0,
            duration: 1000,
        });


        timeline.add(glasses0.current, {
            opacity: 0,
        })
        .add(glasses1.current, {
            opacity: 1,
        })
        .add(glasses1.current, {
            rotate: '7deg',
            y: '-3%',
            x: '2%',
            ease: 'outBack',
            duration: 200,
        })
        .add(glasses1.current, {
            rotate: '0',
            y: '0',
            x: '0',
            ease: 'outBack',
            duration: 200,
        })
        .add(glasses1.current, {
            opacity: 1,
            duration: 1000,
        });

        
        timeline.add(glasses1.current, {
            opacity: 0,
        })
        .add(glasses0.current, {
            opacity: 1,
        })
        .add(glasses0.current, {
            rotate: '5deg',
            y: '-1%',
            x: '1%',
            ease: 'outBack',
            duration: 200,
        })
        .add(glasses0.current, {
            rotate: '0',
            y: '0',
            x: '0',
            ease: 'outBack',
            duration: 200,
        })
        .add(glasses0.current, {
            opacity: 1,
            duration: 1000,
        });

        return _ => {
            timeline.revert();
            scope.current.revert();
        };
    }, [scale]);



    return (
        <div style={explicitContainerStyle} className={`${mainStyles['container']} ${className}`} ref={root}>
            <img src={mascotcoin} ref={coin} width="80" style={ partsData.coin.style } alt=''/>
            <img src={mascotbody} width="80" style={ partsData.body.style } alt=''/>
            <img src={mascotglasses0} ref={glasses0} width="80" style={ partsData.glasses0.style } alt=''/>
            <img src={mascotglasses1} ref={glasses1} width="80" style={ partsData.glasses1.style } alt=''/>
        </div>
    );
}