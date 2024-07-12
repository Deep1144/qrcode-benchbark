import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import QRCode from 'qrcode'

function App() {
  const canvasRef = useRef()
  const [qrCodeResult, setQrCodeResult] = useState({})

  const renderQr = () => {
    const cpuStart = performance.now();
    const memoryStart = performance.memory.usedJSHeapSize;

    // Execute the method and measure time taken
    const startTime = performance.now();

    QRCode.toCanvas(
      canvasRef.current,
      'https://www.siriusxm.com/',
      { toSJISFunc: QRCode.toSJIS },
      function (error) {
        if (error) console.error(error)
        console.log('success!')

        const endTime = performance.now();
        const cpuEnd = performance.now();
        const memoryEnd = performance.memory.usedJSHeapSize;

        // Calculate metrics
        const timeTaken = (endTime - startTime); // Convert to seconds
        const cpuUsage = (cpuEnd - cpuStart); // Convert to seconds
        const memoryUsage = (memoryEnd - memoryStart) / 1024; // Convert to KB

        // Set the formatted results
        setQrCodeResult({
          timeTaken: `${timeTaken.toFixed(2)} ms`,
          cpuUsage: `${cpuUsage.toFixed(2)} ms`,
          memoryUsage: `${memoryUsage.toFixed(2)} KB`
        });
      }
    );
  };

  return (
    <>
      <canvas style={{height:256}} ref={canvasRef}></canvas>
      <div>
        <pre>
          {JSON.stringify(qrCodeResult, null, 2)}
        </pre>
      </div>
      <button onClick={renderQr}>
        Render
      </button>
    </>
  )
}

export default App
