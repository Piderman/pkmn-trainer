const axios = require('axios')

const handler = async (event) => {
  try {
    const response = await axios.get('https://api.printful.com/products', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID,
        Authorization: `Basic ${process.env.PRINTFUL_TOKEN}`
      }
    }).catch((error) => {
      console.log('[product] await error', error)
      return {
        statusCode: 500,
        body: error.toString()
      }
    })


    console.log('[product] got:', response.data.result.length)

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.result[0]),
    }
  } catch (error) {
    console.log('[product] catch', error)
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }