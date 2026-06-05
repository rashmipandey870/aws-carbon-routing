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
    // RTT
    const start = Date.now();

    await axios.get("https://aws.amazon.com");

    const rtt = Date.now() - start;

    // CPU
    const cpu = await getCPU();

    // Carbon Intensity
    const carbonResponse = await axios.get(
      "https://api.electricitymap.org/v3/carbon-intensity/latest",
      {
        headers: {
          "auth-token": process.env.ELECTRICITY_MAPS_API_KEY,
        },
        params: {
          zone: "SE", // change if needed
        },
      }
    );

    const carbon = carbonResponse.data.carbonIntensity;

    res.json({
      region: "eu-north-1",
      timestamp: new Date().toISOString(),
      cpu,
      rtt,
      carbon,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/carbon", async (req, res) => {

    try {

        const response = await axios.get(
            "https://api.electricitymap.org/v3/carbon-intensity/latest",
            {
                headers: {
                    "auth-token": process.env.ELECTRICITY_MAPS_API_KEY
                },
                params: {
                    zone: "SE"
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});