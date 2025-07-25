import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Redux/store.js'
// import {store, persistor } from "./Redux/store";
// import { PersistGate } from "redux-persist/integration/react";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App/>
    </Provider>
  </StrictMode>,
  
)
