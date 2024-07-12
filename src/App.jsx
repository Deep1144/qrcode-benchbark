import { useEffect, useLayoutEffect, useRef } from 'react'
import './App.css'
import QRCode from 'qrcode'
// import 'qrcodejs/jquery.min'
// import 'qrcodejs/qrcode'
// const QRCode = require('qrcodejs')
import Stats from 'stats.js';

function App() {
  const divRef = useRef()
  const canvasRef = useRef()

  // useLayoutEffect(()=> {
  //   console.log('QRCode',QRCode)
  //   const qrcode = new QRCode(divRef.current, {
  //     text: "http://jindo.dev.naver.com/collie",
  //     width: 128,
  //     height: 128,
  //     colorDark : "#000000",
  //     colorLight : "#ffffff",
  //     // correctLevel : QRCode.CorrectLevel.H
  // });


  // }, [])

  useLayoutEffect(() => {

    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.addPanel(1)
    console.log(
      stats
    )
    document.getElementById('stats').appendChild(stats.dom);

    stats.begin();

    const startTime = performance.now();

    QRCode.toCanvas(
      canvasRef.current,
      'sample text',
      { toSJISFunc: QRCode.toSJIS },
      function (error) {
        if (error) console.error(error)
        console.log('success!')
        stats.end();
        const endTime = performance.now();
        
      }
    )
  }, [])


  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <div ref={divRef}>

      </div>

      <div className='stats' id='stats'></div>
    </>
  )
}

export default App
