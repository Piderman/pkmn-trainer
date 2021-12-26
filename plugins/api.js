/**
 * Manages for API calls via axios
 * so we can call functions with params that point to API routes
 */
export default ({ $axios }, inject) => {
  const fetchPokemonById = (id) => $axios.$get(`/api/pkmn/${id}`)
  const fetchAllPokemon = () => $axios.$get('/api/pkmn')

  // as its both dual or single
  const fetchPokemonEfficacy = (ids) =>
    $axios.$get(`/api/pkmn_type_efficacy/${ids.join('/')}`)

  inject('api', {
    fetchPokemonById,
    fetchAllPokemon,
    fetchPokemonEfficacy,
  })
}
