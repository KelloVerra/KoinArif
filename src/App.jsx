import { lazy, Suspense, useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router'


// Import Pages
const Landing = lazy(_ => import('./pages/Landing'));
const Home = lazy(_ => import('./pages/Home'));
const Material = lazy(_ => import('./pages/Material'));
const QuizPage = lazy(_ => import('./pages/QuizPage'));
const NotFound = lazy(_ => import('./pages/NotFound'));


// Utils
import { useSelector } from 'react-redux';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';
import ScrollToTop from './comps/ScrollToTop';
import Loading from './comps/Loading';
import LogOutWarning from './comps/Popup/LogOutWarning';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';





export default function App() {
  const userState = useSelector(state => state.user.value);
  const [logOutWarnVisible, setLogOutWarnVisible] = useState(false);

  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 3

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <HashRouter>
      <Toaster 
        position='top-right'
        containerClassName='toast-container'
        toastOptions={{
          duration: 4000,
          gutter: '1rem',
          style: {
            textAlign: 'left',
            backgroundColor: 'color-mix(in srgb, var(--col-accent1) 25%, var(--col-primary))',
            color: 'var(--col-accent1)',
            fontSize: '1rem',
            fontWeight: '500',
          },
          error: { style:{
            width: 'fit-content',
            backgroundColor: 'var(--col-accent0)',
            color: 'var(--col-primary)',
            border: 'none',
          }},
        }}
      />
      
      <ScrollToTop />
      <LogOutWarning visible={{val: logOutWarnVisible, set: setLogOutWarnVisible}} />
      <Navbar setLogOutWarnVisible={setLogOutWarnVisible}/>

      <Suspense fallback={<Loading style={{marginBottom: '65vh'}} />}>
        <Routes>
          <Route path='/' element={userState.hasStarted ? <Home /> : <Landing />} />
          <Route path='/material' element={<Material />} />
          <Route path='/quiz' element={<QuizPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer setLogOutWarnVisible={setLogOutWarnVisible}/>
    </HashRouter>
  )
}

