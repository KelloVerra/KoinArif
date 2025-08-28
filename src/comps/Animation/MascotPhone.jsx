import { createTimeline } from 'animejs';
import { useEffect, useRef } from 'react';

import mainStyles from './main.module.css';

import mascotbody from '/mascot/phone/body.svg';
import mascotphone from '/mascot/phone/phone.svg';
import phonecontent0 from '/mascot/phone/phonecontent0.svg';
import phonecontent1 from '/mascot/phone/phonecontent1.svg';


export default function MascotPhone({scale, className}) {

    const partsData = {
        body: {
            style:{ left: 0, top: 0, width: '100%' },
        },
        content0: {
            style:{ left: 0, top: 0, width: '100%' },
        },
        content1: {
            style:{ left: 0, top: 0, width: '100%', opacity: 0 },
        },
    }
    const content0 = useRef(null);
    const content1 = useRef(null);

    const explicitContainerStyle = { 
        width: `${11 * scale}rem`, 
        height: `${11.5 * scale}rem`, 

    };

    useEffect(_ => {
        const timeline = createTimeline({
            defaults: {
                duration: 5,
                ease: 'steps(1)',
            },
            loop: true,
        });

        timeline.add(content0.current, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1000,
        });
        timeline.add(content0.current, {
            x: '-1%',
            y: '-7.5%',
            opacity: 0,
            ease: 'outCubic',
            duration: 500,
        });
        timeline.add(content1.current, {
            x: '1%',
            y: '7.5%',
        }, "-=500");
        timeline.add(content1.current, {
            x: 0,
            y: 0,
            opacity: 1,
            ease: 'outCubic',
            duration: 500,
        }, "-=495");
        timeline.add(content1.current, {
            opacity: 1,
            duration: 800,
        });
        timeline.add(content1.current, {
            x: '-1%',
            y: '-7.5%',
            opacity: 0,
            ease: 'outCubic',
            duration: 500,
        });
        timeline.add(content0.current, {
            x: '1%',
            y: '7.5%',
        }, "-=500");
        timeline.add(content0.current, {
            x: 0,
            y: 0,
            opacity: 1,
            ease: 'outCubic',
            duration: 500,
        }, "-=495");

        return _ => timeline.revert();
    }, [scale]);



    return (
        <div style={explicitContainerStyle} className={`${mainStyles['container']} ${className}`}>
            <img src={mascotphone} width="80" style={ partsData.body.style } alt=''/>
            <img src={phonecontent0} ref={content0} width="80" style={ partsData.content0.style } alt=''/>
            <img src={phonecontent1} ref={content1} width="80" style={ partsData.content1.style } alt=''/>
            <img src={mascotbody} width="80" style={ partsData.body.style } alt=''/>
        </div>
    );
}