// import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { setUserHasStarted } from '../glob/state';
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

  const quitLearning = () => {
    dispatch(setUserHasStarted(false))
  };
  const enterMaterial = () => {
    navigate("/material");
  };
  const goToCredits = () => {
    navigate("/credit");
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={enterMaterial}>Masuk Materi</button>
      <button onClick={goToCredits}>Kredit & Atribusi</button>
      <button onClick={quitLearning}>DEBUG Keluar</button>
    </>
  )
}
