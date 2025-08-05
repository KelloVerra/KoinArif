import { useEffect, useState } from 'react';
import { getMaterialByIndex } from '../glob/materials'
import { useNavigate } from 'react-router';

// import './Material.css'

// Components
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'

export default function material() {

  const [material, setMaterial] = useState(getMaterialByIndex(0));
  const navigate = useNavigate();

  useEffect(_ => {

    if(material.error)
      console.log("error")
  
  }, [material])

  return (
    <>
      {material.element}
    </>
  )
}