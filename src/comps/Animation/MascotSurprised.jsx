import { animate, createScope, createTimeline } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotbody from '/mascot/surprised/body.svg';
import mascotcoin from '/mascot/surprised/coin.svg';
import mascotcoinpop from '/mascot/surprised/coinpop.svg';
import mascoteye from '/mascot/surprised/eye.svg';


export default function MascotSurprised({scale, className}) {

    const partsData = {
        body: {
            style:{ left: 0, top: 0, width: '100%' },
        },
        coin: {
            style:{ left: '20%', top: '8.5%', width: '32.5%' },
        },
        coinpop: {
            style:{ left: '17%', top: '0%', width: '0' },
        },
        eye: {
            style:{ left: '12%', top: 0, width: '100%'},
            keyframes: [
                {y: '17%'   , scaleY: 0,    ease: 'inCirc',     duration: 100,  },
                {y: 0       , scaleY: 1,    ease: 'outBack',    duration: 100,  },
                {y: 0       , scaleY: 1,    ease: 'outBack',    duration: 100,  },
                {y: '17%'   , scaleY: 0,    ease: 'inCirc',     duration: 100,  },
                {y: 0       , scaleY: 1,    ease: 'outBack',    duration: 100,  },
                {y: 0       , scaleY: 1,    ease: 'outBack',    duration: 2000,  },
            ],
        },
    }
    const coin = useRef(null);
    const coinpop = useRef(null);
    const eye = useRef(null);

    const explicitContainerStyle = {
        width: `${9 * scale}rem`,
        height: `${12 * scale}rem`,
    };

    const scope = useRef(null);
    const root = useRef(null);
    useEffect(_ => {
        
        const onTimelineEnd = _ => scope.current = createScope({ root }).add(_ => {
            animate(eye.current, {
                keyframes: partsData.eye.keyframes,
                loop: true,
                loopDelay: 0,
                delay: 500,
            });
        });

        const timeline = createTimeline({
            defaults: {
                duration: 5,
                ease: 'steps(1)',
            },
            loop: false,
            onComplete: onTimelineEnd
        });

        timeline.add(eye.current, {
            left: '5%',
            y: '-5%',
            scaleY: 1.25,
            ease: 'inCirc',
            duration: 100,
        });
        timeline.add(eye.current, {
            y: 0,
            scaleY: 1,
            ease: 'outBack',
            duration: 300,
        });
        timeline.add(coin.current, {
            x: 0,
            y: '15%',
            scale: '100%',
            duration: 50,
        }, '-=600');
        timeline.add(coin.current, {
            x: 0,
            y: '-10%',
            scale: '120%',
            ease: 'outQuad',
            duration: 1000,
        }, '-=400');
        timeline.add(coin.current, {
            scale: 0,
            duration: 10,
        });
        timeline.add(coinpop.current, {
            width: '35%',
            scale: '125%',
            duration: 0,
        });
        timeline.add(coinpop.current, {
            scale: '200%',
            ease: 'outCirc',
            duration: 150,
        });
        timeline.add(coinpop.current, {
            scale: '0%',
        });

        return _ => {
            timeline.revert();
            if (scope.current)
                scope.current.revert();
        };
    }, [scale]);



    return (
        <div style={explicitContainerStyle} className={`${mainStyles['container']} ${className}`} ref={root}>
            <img src={mascotcoin} ref={coin} width="80" style={ partsData.coin.style } alt=''/>
            <img src={mascotcoinpop} ref={coinpop} width="80" style={ partsData.coinpop.style } alt=''/>
            <img src={mascotbody} width="80" style={ partsData.body.style } alt=''/>
            <img src={mascoteye} ref={eye} width="80" style={ partsData.eye.style } alt=''/>
        </div>
    );
}