const { groupBy, multiply, orderBy } = require('lodash')
const axios = require('axios')

// todo: how to read host w.out passing it around
const getTypeData = async () => {
  const { data } = await axios.get(
    `${process.env.URL}/content/pkmn/type-efficacy.json`
  )

  return data.filter(({ damage_factor }) => damage_factor !== 1)
}

const getTypeEfficacy = async (id) => {
  const damageData = await getTypeData()

  const attackingDamage = damageData
    .filter((entry) => entry.damage_type_id == id)
    .map(({ damage_factor, target_type_id }) => {
      return {
        damage_factor,
        id: target_type_id,
      }
    })

  const defendingDamage = damageData
    .filter((entry) => entry.target_type_id == id)
    .map(({ damage_factor, damage_type_id }) => {
      return {
        damage_factor,
        id: damage_type_id,
      }
    })

  return {
    offense: orderBy(attackingDamage, 'damage_factor', 'desc'),
    defense: orderBy(defendingDamage, 'damage_factor', 'desc'),
  }
}

const getDualTypeEfficacy = async ([primary, secondary]) => {
  const primaryType = await getTypeEfficacy(primary)
  const secondaryType = await getTypeEfficacy(secondary)

  const allDefense = groupBy(
    primaryType.defense.concat(secondaryType.defense),
    'id'
  )

  return {
    offense: primaryType.offense,
    defense: calculateDualTypeEffectiveness(allDefense),
    secondaryOffense: secondaryType.offense,
  }
}

const calculateDualTypeEffectiveness = (damageTypes) => {
  return orderBy(
    Object.entries(damageTypes).map(([id, damageFactors]) => {
      return {
        damage_factor: multiply(
          ...damageFactors.map((entry) => entry.damage_factor)
        ),
        id,
      }
    }),
    'damage_factor',
    'desc'
  )
}

const handler = async (event) => {
  try {
    const [_, typeArgs] = event.path.split('pkmn_type_efficacy/')

    const typeIds = typeArgs.split('/')

    const response =
      typeIds.length === 1
        ? await getTypeEfficacy(typeIds)
        : await getDualTypeEfficacy(typeIds)

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
