const axios = require('axios')

const getPokemon = async () => {
  const { data: pkmnData } = await axios.get(
    `${process.env.URL}/content/pkmn/pokemon.json`
  )

  const { data: pkmnTypes } = await axios.get(
    `${process.env.URL}/content/pkmn/pokemon-types.json`
  )

  const parsedPokemon = pkmnData.map((pkmn) => {
    const types =
      pkmnTypes.filter((pkmnType) => pkmnType.pokemon_id === pkmn.id) || []

    return {
      ...pkmn,
      types: types.map((entry) => entry.type_id),
    }
  })

  return parsedPokemon
}

const getAllPkmn = async () => {
  return await getPokemon()
}

const getPkmnById = async (id) => {
  const pkmn = await getPokemon()

  const thisPkmn = pkmn.find((pkmn) => pkmn.id == id)

  return thisPkmn
}

const handler = async (event) => {
  try {
    const idParam = event.path.split('/').pop()

    const response =
      idParam === 'pkmn' ? await getAllPkmn() : await getPkmnById(idParam)

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
