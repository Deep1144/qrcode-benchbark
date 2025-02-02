import { useRef, useState } from 'react'
import './App.css'
import MemoryStats from 'memory-stats'
// import QRCode from 'qrcodejs'
const stats = new MemoryStats();
stats.domElement.style.position = 'fixed';
stats.domElement.style.right = '0px';
stats.domElement.style.bottom = '0px';

document.body.appendChild(stats.domElement);


requestAnimationFrame(function rAFloop() {
    stats.update();
    requestAnimationFrame(rAFloop);
});
function App() {
    const divRf = useRef()
    const [qrCodeResult, setQrCodeResult] = useState({})
    const iterations = 2000;
    const renderQr = (callback) => {
        try {
            while (divRf.current.hasChildNodes()) {
                divRf.current.removeChild(divRf.current.firstChild);
            }
        } catch (error) {
            console.log('error', error);
        }
        new QRCode(divRf.current, {
            text: "https://www.siriusxm.com/",
            width: 100,
            height: 100,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        callback({  });
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
                QrcodeJs
            </h1>
            <div ref={divRf}></div>
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
