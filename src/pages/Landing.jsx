import { useState } from 'react'

import './Landing.css'

// Components
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'
// import { useDispatch, useSelector } from 'react-redux'
// import { dec, inc } from '../glob/state'

export default function Landing() {
  // const [count, setCount] = useState(0)
  // const t = useSelector(s => s.test.value);
  // const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <main>
        <h1>Hello World</h1>
      </main>
      <Footer />
    </>
  )
}
