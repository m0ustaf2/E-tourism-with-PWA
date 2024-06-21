import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./i18n.ts"
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './Redux/Store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer autoClose={1000} style={{ marginTop:50}} theme='dark'/>
    <App />
    </Provider>
  </React.StrictMode>,
)
