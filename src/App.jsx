import { useRef, useState } from 'react'
import './App.css'
import QRCode from 'qrcode'

function App() {
  const canvasRef = useRef()
  const [qrCodeResult, setQrCodeResult] = useState({})
  const iterations = 2000;

  const renderQr = (callback) => {
    const cpuStart = performance.now();
    const memoryStart = performance.memory.usedJSHeapSize;

    // Execute the method and measure time taken
    const startTime = performance.now();

    QRCode.toCanvas(
      canvasRef.current,
      'https://www.siriusxm.com/',
      { toSJISFunc: QRCode.toSJIS },
      function (error) {
        if (error) console.error(error);
        const endTime = performance.now();
        const cpuEnd = performance.now();
        const memoryEnd = performance.memory.usedJSHeapSize;

        // Calculate metrics
        const timeTaken = endTime - startTime; // in ms
        const cpuUsage = cpuEnd - cpuStart; // in ms
        const memoryUsage = (memoryEnd - memoryStart) / 1024; // in KB

        callback({ timeTaken, cpuUsage, memoryUsage });
      }
    );
  };

  const runBenchmark = async () => {
    let totalTime = 0;
    let totalCpu = 0;
    let totalMemory = 0;

    for (let i = 0; i < iterations; i++) {
      await new Promise((resolve) => {
        renderQr(({ timeTaken, cpuUsage, memoryUsage }) => {
          totalTime += timeTaken;
          totalCpu += cpuUsage;
          totalMemory += memoryUsage;
          resolve();
        });
      });
    }

    const avgTimeTaken = (totalTime / iterations).toFixed(2);
    const avgCpuUsage = (totalCpu / iterations).toFixed(2);
    const avgMemoryUsage = (totalMemory / iterations).toFixed(2);

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
