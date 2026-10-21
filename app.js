const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Inisialisasi Prometheus Metrics (Default CPU/RAM metrics)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Endpoint 1: Main Web Page
app.get('/', (req, res) => {
  res.status(200).send('Hello World v1.0');
});

// Endpoint 2: Health Check (untuk Load Balancer / Container Probe)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Endpoint 3: Metrics (untuk Scrape Prometheus)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
