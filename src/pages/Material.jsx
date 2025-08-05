import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getMaterialByIndex } from '../glob/materials'
import { incrementMaterialLevel} from '../glob/state'

// import './Material.css'

// Components
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'

export default function material() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const materialState = useSelector(state => state.material.value)

  const [receivedMaterialData, setReceivedMaterialData] = useState(getMaterialByIndex(getMaterialByIndex(materialState.materialLevel)));

  // update material
  useEffect(_ => {
    const materialIndex = materialState.materialLevel;
    const materialData = getMaterialByIndex(materialIndex);

    if(receivedMaterialData.error)
      console.log(`error while obtaining material index of ${materialIndex}`)

    setReceivedMaterialData(materialData);
  }, [materialState])



  return (
    <>
      {receivedMaterialData.element}
    </>
  )
}