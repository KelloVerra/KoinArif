import { useState } from 'react'

// import './CreditsAttributions.css'

// Components
import Navbar from '../comps/Navbar'
import Footer from '../comps/Footer'

export default function CreditsAttributions() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Credits</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
