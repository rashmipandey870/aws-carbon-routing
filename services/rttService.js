const axios = require("axios");

async function getRTT(url) {

  try {

    const start = Date.now();

    await axios.get(url);

    const rtt = Date.now() - start;

    return rtt;

  } catch (error) {

    console.error(error);

    return null;

  }

}

module.exports = {
  getRTT
};