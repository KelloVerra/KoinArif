import { createTimeline } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotbodybg from '/mascot/hero/bodybg.svg';
import mascotcoin from '/mascot/hero/coin.svg';
import mascotbodyfg from '/mascot/hero/bodyfg.svg';

import mascotexpressdef from '/mascot/hero/exprdef.svg';
import mascotexpresshappy from '/mascot/hero/exprhappi.svg';
import mascotexpressexcite from '/mascot/hero/exprexci.svg';


export default function MascotHero({scale, className}) {

    const partsData = {
        bodybg: {
            style:{ left: 0, bottom: 0, width: '100%' },
        },
        bodyfg: {
            style:{ left: 0, bottom: 0, width: '100%' },
        },
        coin0: {
            style:{ left: 0, bottom: 0, width: '100%' },
        },
        exprhappy: {
            style:{ left: 0, bottom: 0, width: '100%', opacity:0 },
        },
        exprexcited: {
            style:{ left: 0, bottom: 0, width: '100%', opacity:0 },
        },
        exprdef: {
            style:{ left: 0, bottom: 0, width: '100%', opacity:1 },
        },
    }
    const eyedef = useRef(null);
    const eyeexcit = useRef(null);
    const eyehappi = useRef(null);

    const coin0 = useRef(null);
    const bodyfg = useRef(null);
    const bodybg = useRef(null);

    const explicitContainerStyle = { 
        width: `${10.5 * scale}rem`, 
        height: `${18 * scale}rem`, 

        position:'absolute', 
        zIndex: -1,
        top: '-57.5%',
        right: '-55%',
    };

    useEffect(_ => {
        const timeline = createTimeline({
            defaults: {
                ease: 'steps(1)',
                duration: 3,
            },
            loop: true,
        });


        const timelineCoinAnim = _ => {
            timeline.add(coin0.current, {
                y: '-50%'
            });
            timeline.add(coin0.current, {
                y:        '10%',
                ease:     'outCirc',
                duration: 800,
            });
            timeline.add(coin0.current, {
                y:        '10%',
                duration: 200,
            });
            timeline.add(coin0.current, {
                y:        '50%',
                ease:     'inBack(3)',
                duration: 800,
            });
        };
        const timelineEyeAnim = i => {
            const sequence = [
                eyehappi.current,
                eyedef.current,
                eyeexcit.current,
                eyedef.current,
            ]

            timeline.add(sequence.at(i-1), {
                opacity:  0
            }, "-=340");
            timeline.add(sequence.at(i), {
                y:        '3%',
                opacity:  1
            }, "-=340");
            timeline.add(sequence.at(i), {
                opacity:  1,
                y:        0,
                ease:     'outBack(3)',
                duration: 200,
            }, "-=320");
            timeline.add(sequence.at(i), {
                y:        0,
                duration: 200,
            });
        };
        const wiggleBody = _ => { 
            timeline.add(bodyfg.current, {
                rotate     : 3
            }, "-=15");
            timeline.add(bodybg.current, {
                rotate     : 3
            }, "-=15");
            timeline.add(bodyfg.current, {
                rotate     : 0,
                ease: "outBack(2)",
                duration: 400,
            },);
            timeline.add(bodybg.current, {
                rotate     : 0,
                ease: "outBack(2)",
                duration: 400,
            }, "-=400");
        }

        timelineCoinAnim();
        wiggleBody();
        timelineEyeAnim(0);

        timelineCoinAnim();
        wiggleBody();
        timelineEyeAnim(1);


        timelineCoinAnim();
        wiggleBody();
        timelineEyeAnim(2);


        timelineCoinAnim();
        wiggleBody();
        timelineEyeAnim(3);

        return _ => timeline.revert();
    }, [scale]);



    return (
        <div style={explicitContainerStyle} className={`${mainStyles['container']} ${className}`}>
            <img src={mascotbodybg} ref={bodybg} width="80" style={ partsData.bodybg.style } alt=''/>
            <img src={mascotcoin} ref={coin0} width="80" style={ partsData.coin0.style } alt=''/>
            <img src={mascotbodyfg} ref={bodyfg} width="80" style={ partsData.bodyfg.style } alt=''/>
            <img src={mascotexpressdef} ref={eyedef} width="80" style={ partsData.exprdef.style } alt=''/>
            <img src={mascotexpresshappy} ref={eyehappi} width="80" style={ partsData.exprhappy.style } alt=''/>
            <img src={mascotexpressexcite} ref={eyeexcit} width="80" style={ partsData.exprexcited.style } alt=''/>
        </div>
    );
}