const {
  getCarbonIntensity
} = require("./services/carbonService");

async function test() {

  const data =
    await getCarbonIntensity("SE-SE3");

  console.log(data);

}

test();