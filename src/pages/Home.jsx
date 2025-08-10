// import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { addHistory, } from '../glob/state';
import { useNavigate } from 'react-router';

// Components
import Footer from '../comps/Footer'
import Navbar from '../comps/Navbar'

export default function Home() {
  const userState = useSelector(stat => stat.user.value);
  const materialState = useSelector(stat => stat.material.value);
  const quizState = useSelector(stat => stat.quiz.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToCredits = () => {
    navigate("/credit");
  };

  // Start material
  const startMaterial = (id) => {
    dispatch(addHistory({
        type: 'material',
        data: {
          material_id: id,
        },
      }));
    navigate("/material");
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={_ => startMaterial(0)}>Masuk Materi 1</button>
      <button onClick={_ => startMaterial(1)}>Masuk Materi 2</button>
      <button onClick={goToCredits}>Kredit & Atribusi</button>
    </>
  )
}
