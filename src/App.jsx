import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

import { appStore, persistAppStore } from './glob/state'


// Import Pages
import Landing from './pages/Landing'
import CreditsAttributions from './pages/CreditsAttributions'
import NotFound from './pages/NotFound'


// Utils
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistAppStore}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/credit' element={<CreditsAttributions />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  )
}



export default App
