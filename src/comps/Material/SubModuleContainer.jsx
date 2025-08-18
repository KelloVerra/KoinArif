import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react';


import styles from '../../pages/Material.module.css'
import budgetLogo from '/Budget3D.svg'
import { useDispatch, useSelector } from 'react-redux';
import { addSubmoduleRewardClaimed, addUserBudget } from '../../glob/state';



export default function SubModuleContainer({children, id, minimizedMaxContentCount, minimizedHeight}) {

    const materialState = useSelector(stat => stat.material.value);
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(false);
    const [hasClaimed, setHasClaimed] = useState(
        materialState.submoduleRewardsTaken.some(v => 
            v.module_id === id.module_id && v.submodule_id === id.submodule_id));
            
    const containerHeight = useRef(100);
    const containerRef = useRef(null);
    const reward = useRef(5);
    
    const format = {material_id:id.material_id,submodule_id:id.submodule_id};
    let hasHeader = false;
    let contentCount = 0;
    const processedChildren = useMemo(_ => Children.map(children, elem => {
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
    }), [expanded]);

    useEffect(_ => {
        // note: might source of bug
        if (containerRef.current)
            containerHeight.current = containerRef.current.scrollHeight + 300;
    }, []);
    

    const expand = _ => {
        setExpanded(true);
    };
    const claimCoin = _ => { // todo; timer?
        if (hasClaimed) return;
        setHasClaimed(true);
        dispatch(addSubmoduleRewardClaimed(format))
        dispatch(addUserBudget(reward.current))
    };



    return (<>
        <div className={styles['submodule-container']} ref={containerRef} style={{maxHeight: expanded ? `${containerHeight.current}px` : minimizedHeight}}>
            {processedChildren}
            {   !hasClaimed ?
                <button onClick={claimCoin} className={styles['submodule-coin-claim-btn']} >
                    <img src={budgetLogo} width='30px' alt='coinLogo' />
                    <p>Klaim {reward.current} Koin</p>
                </button> : null
            }
            {
                expanded ? null :
                <button onClick={expand} className={styles['submodule-expand-btn']} >
                    {/* TODO: ICON */}
                    Pelajari lebih dalam V
                </button>
            }
        </div>
    </>);
}