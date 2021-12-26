/**
 * Manages for API calls via axios
 * so we can call functions with params that point to API routes
 */
export default ({ $axios }, inject) => {
  const fetchPokemonById = (id) => $axios.$get(`/api/pkmn/${id}`)
  const fetchAllPokemon = () => $axios.$get('/api/pkmn')

  inject('api', {
    fetchPokemonById,
    fetchAllPokemon,
  })
}
