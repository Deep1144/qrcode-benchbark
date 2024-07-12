import { useEffect, useLayoutEffect, useRef } from 'react'
import './App.css'
import QRCode from 'qrcode'
// import 'qrcodejs/jquery.min'
// import 'qrcodejs/qrcode'
// const QRCode = require('qrcodejs')

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

    const cpuStart = performance.now();
    const memoryStart = performance.memory.usedJSHeapSize;

    // Execute the method and measure time taken
    const startTime = performance.now();

    QRCode.toCanvas(
      canvasRef.current,
      'sample text',
      { toSJISFunc: QRCode.toSJIS },
      function (error) {
        if (error) console.error(error)
        console.log('success!')

        const endTime = performance.now();

        const cpuEnd = performance.now();
        const memoryEnd = performance.memory.usedJSHeapSize;

        // Calculate metrics
        const timeTaken = endTime - startTime;
        const cpuUsage = cpuEnd - cpuStart;
        const memoryUsage = memoryEnd - memoryStart;
        console.log({
          timeTaken,
          cpuUsage,
          memoryUsage
        })
      }
    )
  }, [])


  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <div ref={divRef}>

      </div>
    </>
  )
}

export default App
