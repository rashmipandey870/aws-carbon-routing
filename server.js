const express = require("express");
const axios = require("axios");
const { getRTT } = require("./services/rttService");

const {
  getCPU,
} = require("./services/cloudwatchService");

const regions =
require("./config/regions");

const {
 getCarbonIntensity
} =
require("./services/carbonService");

const app = express();

app.get("/rtt", async (req, res) => {

  try {

    const rtt = await getRTT();

    res.json({
      rtt
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

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

    const region = regions.find(
      r => r.awsRegion === "eu-north-1"
    );

    const cpu = await getCPU();

    const rtt = await getRTT(
      "https://aws.amazon.com"
    );

    const carbonData =
      await getCarbonIntensity(
        region.zone
      );

    res.json({

      region: region.awsRegion,

      name: region.name,

      timestamp:
        new Date().toISOString(),

      cpu,

      rtt,

      carbon:
        carbonData?.carbonIntensity

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
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

app.get(
"/all-carbon",
async (req,res)=>{

try{

 const results=[];

 for(const region of regions){

   const data=
   await getCarbonIntensity(
    region.zone
   );

   results.push({

    region:
    region.awsRegion,

    name:
    region.name,

    carbon:
    data?.carbonIntensity

   });

 }

 res.json(results);

}catch(error){

 res.status(500).json({
  error:error.message
 });

}

});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});