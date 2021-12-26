const typeData = require('../../static/content/pkmn/types.json')

/**
 * Translates CSV data such as IDs to eng values
 *
 * eg `type_id: 1 > "normal"
 */
export default (_, inject) => {
  /**
   * get eng label of Type Id
   */
  const classification = (id) => {
    const { identifier = '' } =
      typeData.find((entry) => entry.id.toString() === id.toString()) || {}

    return identifier
  }

  inject('pkmnLabels', {
    classification,
  })
}
