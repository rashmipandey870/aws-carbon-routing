const regions =
require("./config/regions");

const {
  getCarbonIntensity
} =
require("./services/carbonService");

async function test() {

  for(const region of regions){

    const data =
    await getCarbonIntensity(
      region.zone
    );

    console.log(
      region.name,
      data
    );

  }

}

test();