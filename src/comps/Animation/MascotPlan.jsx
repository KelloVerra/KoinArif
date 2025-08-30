import { animate, createScope, createTimeline } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotclock from '/mascot/plan/clock.svg';
import mascotbody from '/mascot/plan/body.svg';
import mascoteyes from '/mascot/plan/eye.svg';
import mascotfeet from '/mascot/plan/feet.svg';

export default function MascotHero({scale, className}) {

    const partsData = {
        clock: {
            style:{ left: 0, top: '5%', width: '57%' },
        },
        body: {
            style:{ left: '5%', top: '5%', width: '95%' },
        },
        eyes: {
            style:{ left: '5%', top: '5%', width: '95%' },
        },
        feet: {
            style:{ left: '5%', top: '5%', width: '95%' },
            keyframes: [
                {y: '-10%',    x: '5%' ,  ease: 'out'  , duration: 500},
                {y: 0,      x: 0 ,  ease: 'out'  , duration: 500},
            ]
        },
    }
    const clock = useRef(null);
    const body = useRef(null);
    const eyes = useRef(null);
    const feet = useRef(null);

    const explicitContainerStyle = { 
        width: `${12.5 * scale}rem`, 
        height: `${10 * scale}rem`,
    };

    const root = useRef(null);
    const scope = useRef(null);
    useEffect(_ => {
        if (scale === 0) return;
        scope.current = createScope({ root }).add(_ => {

            animate(feet.current, {
                keyframes: partsData.feet.keyframes,
                loop: true,
                loopDelay: 0,
            });

        });

        const timeline = createTimeline({
            defaults: {
                duration: 5,
                ease: 'steps(1)',
            },
            loop: true,
        });
        const wiggleClock = _ => {
            timeline.add(clock.current, {
                y: '-20%',
                rotate     : 15,
                ease: 'outSine',
                duration: 200,
            }, "-=15");
            timeline.add(clock.current, {
                rotate: -5,
                ease: 'outBack(4)',
                duration: 200,
            });
            timeline.add(clock.current, {
                rotate: 0,
                ease: 'outBack(3)',
                duration: 100,
            });
            timeline.add(clock.current, {
                y: 0,
                ease: 'outBounce',
                duration: 500,
            });
        };

        timeline.add(eyes.current, {
            x: '8%',
            y: '1%',
            scaleY: 0.5,
            ease: 'outCirc',
            duration: 1000,
        });
        timeline.add(eyes.current, {
            opacity: 1,
            duration: 500,
        });
        wiggleClock();
        timeline.add(eyes.current, {
            x: 0,
            y: 0,
            scaleY: 1,
            ease: 'outCirc',
            duration: 500,
        },'-=800');
        timeline.add(eyes.current, {
            opacity: 1,
            duration: 2000,
        },'-=800');

        return _ => {
            timeline.revert();
            scope.current.revert();
        };
    }, [scale]);



    return (
        <div style={explicitContainerStyle} className={`${mainStyles['container']} ${className}`} ref={root}>
            <img src={mascotclock} ref={clock} width="80" style={ partsData.clock.style } alt=''/>
            <img src={mascotbody} ref={body} width="80" style={ partsData.body.style } alt=''/>
            <img src={mascoteyes} ref={eyes} width="80" style={ partsData.eyes.style } alt=''/>
            <img src={mascotfeet} ref={feet} width="80" style={ partsData.feet.style } alt=''/>
        </div>
    );
}