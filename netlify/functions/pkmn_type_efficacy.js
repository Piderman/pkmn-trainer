const axios = require('axios')

// todo: how to read host w.out passing it around
const getTypeData = async () => {
  const { data } = await axios.get(
    `${process.env.URL}/content/pkmn/type-efficacy.json`
  )

  return data
}

const getTypeEfficacy = async (id) => {
  const data = await getTypeData()
  const typeToDamage = data.filter((entry) => entry.damage_type_id == id)
  const typeToFrom = data.filter((entry) => entry.target_type_id == id)

  return {
    to: typeToDamage,
    from: typeToFrom,
  }
}

const handler = async (event) => {
  try {
    const typeArg = event.path.split('/').pop()

    const response =
      typeArg === 'pkmn_type_efficacy' ? {} : await getTypeEfficacy(typeArg)

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
