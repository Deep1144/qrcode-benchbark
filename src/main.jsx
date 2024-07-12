import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import App2 from './App2.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
  <div style={{display:'flex'}}>
    <div className='w-50'>
    <App />
    </div>
    <div className='w-50'>
    <App2 />
    </div>
  </div>
  </>
  // </React.StrictMode>,
)
