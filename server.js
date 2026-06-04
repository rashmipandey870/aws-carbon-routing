const express = require("express");
const axios = require("axios");

const {
  getCPU,
} = require("./services/cloudwatchService");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "GreenRoute API Running",
  });
});

app.get("/cpu", async (req, res) => {
  try {
    const cpu = await getCPU();

    res.json({
      cpu,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/rtt", async (req, res) => {
  try {
    const start = Date.now();

    await axios.get(
      "https://aws.amazon.com"
    );

    const rtt = Date.now() - start;

    res.json({
      rtt,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/metrics", async (req, res) => {
  try {
    const start = Date.now();

    await axios.get(
      "https://aws.amazon.com"
    );

    const rtt = Date.now() - start;

    const cpu = await getCPU();

    res.json({
      region: "eu-north-1",
      cpu,
      rtt,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});