import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getMaterialByIndex } from '../glob/materials'
import { addHistory, incrementMaterialLevel} from '../glob/state'

// import './Material.css'

// Components
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'

export default function material() {

  // TODO: navigate to landing if user hasnt started
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const quizState = useSelector(stat => stat.quiz.value);

  const [receivedMaterialData, setReceivedMaterialData] = useState({});

  // update material
  useEffect(_ => {
    const materialIndex = userState.history[0].data.material_id;
    const materialData = getMaterialByIndex(materialIndex);

    if(receivedMaterialData.error)
      console.log(`error while obtaining material index of ${materialIndex}`)

    setReceivedMaterialData(materialData);
  }, [materialState])


  // Callback
  const startQuiz = () => {
    dispatch(addHistory({
        type: 'quiz',
        data: {
          material_id: receivedMaterialData.id,
        },
      }));
    navigate("/quiz");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      {receivedMaterialData.element}
      <button onClick={startQuiz}>Latihan Kuis</button>
      <button onClick={goHome}>Balik</button>
    </>
  )
}