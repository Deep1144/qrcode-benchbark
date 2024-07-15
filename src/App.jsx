import { useRef, useState } from 'react'
import './App.css'
import QRCode from 'qrcode'

function App() {
  const canvasRef = useRef()
  const [qrCodeResult, setQrCodeResult] = useState({})
  const iterations = 2000;

  const renderQr = (callback) => {

    QRCode.toCanvas(
      canvasRef.current,
      'https://www.siriusxm.com/',
      { toSJISFunc: QRCode.toSJIS },
      function (error) {
        if (error) console.error(error);
        callback({  });
      }
    );
  };

  const runBenchmark = async () => {
    const cpuStart = performance.now();
    const memoryStart = performance.memory.usedJSHeapSize;

    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      await new Promise((resolve) => {
        renderQr(({ }) => {
          resolve();
        });
      });
    }

    const endTime = performance.now();
    const cpuEnd = performance.now();
    const memoryEnd = performance.memory.usedJSHeapSize;

    const timeTaken = endTime - startTime; // in ms
    const cpuUsage = cpuEnd - cpuStart; // in ms
    const memoryUsage = (memoryEnd - memoryStart) / 1024; // in KB


    const avgTimeTaken = (timeTaken / iterations).toFixed(2);
    const avgCpuUsage = (cpuUsage / iterations).toFixed(2);
    const avgMemoryUsage = (memoryUsage / iterations).toFixed(2);
    
    setQrCodeResult({
      timeTaken: `${avgTimeTaken} ms`,
      cpuUsage: `${avgCpuUsage} ms`,
      memoryUsage: `${avgMemoryUsage} KB`
    });
  };

  return (
    <>
    <h1>
    qrcode
    </h1>
      <canvas  ref={canvasRef}></canvas>
      <div>
        <pre>
          {JSON.stringify(qrCodeResult, null, 2)}
        </pre>
      </div>
      <button onClick={runBenchmark}>
        Render
      </button>
    </>
  )
}

export default App
