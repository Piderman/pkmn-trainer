const axios = require('axios')

// todo: how to read host w.out passing it around
const getTypeData = async (host) => {
  console.log('host:', process.env.URL)
  const { data } = await axios.get(`${process.env.URL}/content/pkmn/types.json`)

  return data
}

const getAllTypes = async (host) => {
  return await getTypeData(host)
}

const getSingleType = async (host, id) => {
  const all = await getAllTypes(host)
  const singleType = all.find((entry) => entry.id.toString() == id.toString())

  return singleType
}

const handler = async (event) => {
  try {
    const { host } = event.headers
    const typeArg = event.path.split('/').pop()

    const response =
      typeArg === 'pkmn_types'
        ? await getAllTypes(host)
        : await getSingleType(host, typeArg)

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
