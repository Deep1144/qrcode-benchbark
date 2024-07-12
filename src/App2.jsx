import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
// import QRCode from 'qrcodejs'

function App() {
    const divRf = useRef()
    const [qrCodeResult, setQrCodeResult] = useState({})

    const renderQr = () => {
        console.log('QRCode', QRCode)
        const cpuStart = performance.now();
        const memoryStart = performance.memory.usedJSHeapSize;

        // Execute the method and measure time taken
        const startTime = performance.now();

        const qrcode = new QRCode(divRf.current, {
            text: "https://www.siriusxm.com/",
            width: 100,
            height: 100,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        console.log('qrcode', qrcode)

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
    };

    return (
        <>
            <div ref={divRf}></div>
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
