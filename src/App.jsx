import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'


// Import Pages
import Landing from './pages/Landing'
import CreditsAttributions from './pages/CreditsAttributions'
import Home from './pages/Home'
import Material from './pages/Material'
import QuizPage from './pages/QuizPage'
import NotFound from './pages/NotFound'


// Utils
import { useSelector } from 'react-redux'
import Navbar from './comps/Navbar'
import Footer from './comps/Footer'





function App() {
  const userState = useSelector(state => state.user.value);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={userState.hasStarted ? <Home /> : <Landing />} />
          <Route path='/material' element={<Material />} />
          <Route path='/quiz' element={<QuizPage />} />
          <Route path='/credit' element={<CreditsAttributions />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}



export default App
