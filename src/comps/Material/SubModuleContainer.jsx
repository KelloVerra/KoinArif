import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';


import styles from '../../pages/Material.module.css'
import budgetLogo from '/Budget3D.svg'



export default function SubModuleContainer({children, id, minimizedMaxContentCount, minimizedHeight}) {

    const [expanded, setExpanded] = useState(false);
    const containerHeight = useRef(100);
    const [hasClaimed, setHasClaimed] = useState(false); // todo: permastate
    const containerRef = useRef(null);

    let hasHeader = false;
    let contentCount = 0;
    const processedChildren = Children.map(children, elem => {
        if(!isValidElement(elem)) return elem;

        // count contents
        if(elem.type === 'p' || elem.type === 'img')
            contentCount += 1;

        if(contentCount >= minimizedMaxContentCount && !expanded)
            return cloneElement(elem, {style:{opacity:0.0,transition:`opacity 200ms`}})

        //  auto header
        if(!hasHeader && elem.type === 'h1') {
            hasHeader = true;
            return (<div className={styles['submodule-header']}>
                <h1>{elem.props.children}</h1>
                <p>M.{id.material_id}.{id.submodule_id}</p>
            </div>);    
        }

            
        // process img  
        if(elem.type === 'img')
            return (<div className={styles['submodule-attachment']}>
                <img src={elem.props.src} alt={elem.props.alt} width={elem.props.width}/>
                <p>{elem.props.alt}</p>
            </div>);

        return elem;
    });
    useEffect(_ => {
        if (containerRef.current)
            containerHeight.current = containerRef.current.scrollHeight + 20;
    }, []);
    

    const toggleExpand = _ => {
        setExpanded(!expanded);
    };
    const claimCoin = _ => { // todo; timer?
        if(hasClaimed) return;
        setHasClaimed(true);
        console.log('claimss!')
    };



    return (<>
        <div className={styles['submodule-container']} ref={containerRef} style={{maxHeight: expanded ? `${containerHeight.current}px` : minimizedHeight}}>
            {processedChildren}
            {   !hasClaimed ?
                <button onClick={claimCoin} className={styles['submodule-coin-claim-btn']} >
                    <img src={budgetLogo} width='30px' alt='coinLogo' />
                    <p>Klaim {20} Koin</p>
                </button> : null
            }
            <button onClick={toggleExpand} className={styles['submodule-expand-btn']} >
                {expanded ? "Perkecil /\\" : "Pelajari lebih dalam V"}
            </button>
        </div>
    </>);
}