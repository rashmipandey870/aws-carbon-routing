const express = require("express");
const axios = require("axios");
const app = express();

app.get("/cpu", async (req,res)=>{

  // CloudWatch logic here

  res.json({
    cpu: 2.35
  });

});
app.get("/cpu", async (req, res) => {
  res.json({
    cpu: 2.35
  });
});

app.get("/rtt", async (req, res) => {

  const start = Date.now();

  await axios.get("https://aws.amazon.com");

  const rtt = Date.now() - start;

  res.json({ rtt });

});
app.get("/metrics", async (req, res) => {

  const start = Date.now();

  await axios.get("https://aws.amazon.com");

  const rtt = Date.now() - start;

  const cpu = 2.35;

  res.json({
    cpu,
    rtt,
    region: "eu-north-1"
  });

});

app.listen(5000);