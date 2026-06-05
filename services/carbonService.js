require("dotenv").config();

const axios = require("axios");

async function getCarbonIntensity(zone) {

  try {

    const response = await axios.get(
      "https://api.electricitymap.org/v3/carbon-intensity/latest",
      {
        headers: {
          "auth-token":
            process.env.ELECTRICITY_MAPS_API_KEY
        },
        params: {
          zone: zone
        }
      }
    );

    return response.data;

  } catch (error) {

  console.error(
    `Error fetching zone ${zone}`
  );

  console.error(
    error.response?.data || error.message
  );

  return null;
}

}

module.exports = {
  getCarbonIntensity
};