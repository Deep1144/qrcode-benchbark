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
        const cpuStart = performance.now();
        const memoryStart = performance.memory.usedJSHeapSize;

        // Execute the method and measure time taken
        const startTime = performance.now();

        new QRCode(divRf.current, {
            text: "https://www.siriusxm.com/",
            width: 100,
            height: 100,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        const endTime = performance.now();
        const cpuEnd = performance.now();
        const memoryEnd = performance.memory.usedJSHeapSize;

        // Calculate metrics
        const timeTaken = endTime - startTime; // in ms
        const cpuUsage = cpuEnd - cpuStart; // in ms
        const memoryUsage = (memoryEnd - memoryStart) / 1024; // in KB

        callback({ timeTaken, cpuUsage, memoryUsage });
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
