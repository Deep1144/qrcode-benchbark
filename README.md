# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# Benchmarking Guide for React Applications

## Introduction

This guide provides a boilerplate approach for benchmarking methods or libraries in a React application. By following these steps, you can measure CPU usage, execution time, and memory usage for any method you want to benchmark.

We will use the performance API to measure the time and CPU usage, and performance.memory to measure memory usage.

## Boilerplate Code

Below is a ready-to-use template for benchmarking methods in a React application.

### Step 1: Setup

Import necessary libraries and initialize your state and refs.

```jsx
  const [benchmarkResult, setBenchmarkResult] = useState({});
  const iterations = 2000; // Number of iterations for benchmarking
```

### Step 2: Define the Method to be Benchmarked

Replace the placeholder method with the actual method you want to benchmark.

```jsx
const methodToBenchmark = (callback) => {
  // Replace this block with the method you want to benchmark
  // For example, QR code generation, data processing, etc.
  // Ensure the callback is called at the end of the method execution
  callback({});
};
```

### Step 3: Benchmarking Function

The function that runs the benchmark by executing the method multiple times and collecting the metrics.

```jsx
const runBenchmark = async () => {
  const cpuStart = performance.now();
  const memoryStart = performance.memory.usedJSHeapSize;
  const startTime = performance.now();

  for (let i = 0; i < iterations; i++) {
    await new Promise((resolve) => {
      methodToBenchmark(() => {
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

  setBenchmarkResult({
    timeTaken: `${avgTimeTaken} ms`,
    cpuUsage: `${avgCpuUsage} ms`,
    memoryUsage: `${avgMemoryUsage} KB`
  });
};
```


## How to Use


1. **Replace the Method:**
   Replace the `methodToBenchmark` function with the actual method you want to benchmark.

2. **Run the Benchmark:**
   Call the "runBenchmark" method to start the benchmarking process. The results will be stored in `benchmarkResult` state.

3. **Analyze Results:**
   Review the results for average time taken, CPU usage, and memory usage.

