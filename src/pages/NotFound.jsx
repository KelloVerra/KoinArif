// import './NotFound.css'

// Components
import { useNavigate } from 'react-router'
import Footer from '../comps/Footer'

export default function NotFound() {

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <h1>Not Found</h1>
      <button onClick={goToHome}>Kembali</button>
    </>
  )
}
