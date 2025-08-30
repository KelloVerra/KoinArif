import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App.jsx'
import { appStore, persistAppStore } from './glob/state'

import './index.css'
import Loading from './comps/Loading.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <PersistGate loading={<Loading />} persistor={persistAppStore}>
      <App />
    </PersistGate>
  </Provider>
)
