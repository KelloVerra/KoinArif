// import './Home.css'
import { useEffect, useState } from 'react';
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

  const [greetings, setGreetings] = useState("Selamat Pagi");

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

  // Render first time
  useEffect(_ => {
    // Sambutan di waktu
    const hour = new Date().getHours();
    if (hour <= 9) setGreetings("Selamat Pagi")
    else if (hour <= 14) setGreetings("Selamat Siang")
    else if (hour <= 18) setGreetings("Selamat Sore")
    else setGreetings("Selamat Malam")
  }, []);

  return (
    <main>
      <div>
        <div>
          <h1>{greetings}!</h1>
          <h2>[stats]</h2>
        </div>
        <ContinueLastActivityButton />
      </div>
      {/* Mascot here */}
      <div>
        <button onClick={_ => startMaterial(0)}>Masuk Materi 1</button>
        <button onClick={_ => startMaterial(1)}>Masuk Materi 2</button>
      </div>
    </main>
  )
}

function ContinueLastActivityButton({continueLastActivity}) {
  return (
    <button onClick={continueLastActivity}>Lanjut __</button>
  )
}
