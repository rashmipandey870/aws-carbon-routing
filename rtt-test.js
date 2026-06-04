const axios = require("axios");

async function testRTT() {

  const start = Date.now();

  await axios.get("https://aws.amazon.com");

  const end = Date.now();

  console.log("RTT =", end - start, "ms");
}

testRTT();