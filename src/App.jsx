import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router'


// Import Pages
const Landing = lazy(_ => import('./pages/Landing'));
const CreditsAttributions = lazy(_ => import('./pages/CreditsAttributions'));
const Home = lazy(_ => import('./pages/Home'));
const Material = lazy(_ => import('./pages/Material'));
const QuizPage = lazy(_ => import('./pages/QuizPage'));
const NotFound = lazy(_ => import('./pages/NotFound'));


// Utils
import { useSelector } from 'react-redux'
import Navbar from './comps/Navbar'
import Footer from './comps/Footer'
import ScrollToTop from './comps/ScrollToTop'
import Loading from './comps/Loading'





function App() {
  const userState = useSelector(state => state.user.value);

  return (
    <>
      <HashRouter>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<Loading style={{marginBottom: '65vh'}} />}>
          <Routes>
            <Route path='/' element={userState.hasStarted ? <Home /> : <Landing />} />
            <Route path='/material' element={<Material />} />
            <Route path='/quiz' element={<QuizPage />} />
            <Route path='/credit' element={<CreditsAttributions />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </HashRouter>
    </>
  )
}



export default App
