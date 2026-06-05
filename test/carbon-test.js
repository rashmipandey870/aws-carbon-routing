require("dotenv").config();

const axios = require("axios");

async function getCarbon() {

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

        console.log(response.data);

    } catch (error) {

        console.error(error.response?.data || error.message);

    }

}

getCarbon();