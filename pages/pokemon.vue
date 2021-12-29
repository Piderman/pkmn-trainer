<template>
  <CBox p="4">
    <CHeading as="h1">Testing Pkmn</CHeading>
    <search-auto-complete @on-selection="handlePokemonSearch" />
    <CDivider my="4" />
    <CStack v-if="pokemon.id">
      <CHeading v-text="pokemon.identifier" />
      <CImage :src="thumbnail" htmlWidth="40px" />
      <div>
        <CBadge
          v-for="(label, index) in pokemon.types"
          :key="index"
          v-text="$pkmnLabels.classification(label)"
          mx="2"
        />
      </div>
      <div>
        <CHeading as="h2">Offensive</CHeading>
        <c-tabs
          :default-index="pokemon.types.length - 1"
          is-fitted
          variant="soft-rounded"
        >
          <c-tab-list>
            <c-tab v-text="$pkmnLabels.classification(pokemon.types[0])" />
            <c-tab
              v-if="pokemon.efficacy.secondaryOffense"
              v-text="$pkmnLabels.classification(pokemon.types[1])"
            />
          </c-tab-list>

          <c-tab-panels>
            <c-tab-panel>
              <div
                v-for="({ damage_factor, id }, index) in pokemon.efficacy
                  .offense"
                :key="`offense_${index}`"
              >
                <CBadge v-text="$pkmnLabels.classification(id)" />
                x{{ damage_factor }}
              </div>
            </c-tab-panel>
            <c-tab-panel v-if="pokemon.efficacy.secondaryOffense">
              <div
                v-for="({ damage_factor, id }, index) in pokemon.efficacy
                  .secondaryOffense"
                :key="`secondaryOffense_${index}`"
              >
                <CBadge v-text="$pkmnLabels.classification(id)" />
                x{{ damage_factor }}
              </div>
            </c-tab-panel>
          </c-tab-panels>
        </c-tabs>

        <CHeading as="h2">Defensive</CHeading>
        <div
          v-for="({ damage_factor, id }, index) in pokemon.efficacy.defense"
          :key="`defending_${index}`"
        >
          <CBadge v-text="$pkmnLabels.classification(id)" />
          x{{ damage_factor }}
        </div>
      </div>
    </CStack>
  </CBox>
</template>

<script>
import {
  CBadge,
  CBox,
  CDivider,
  CHeading,
  CImage,
  CStack,
  CTab,
  CTabList,
  CTabPanel,
  CTabPanels,
  CTabs,
} from '@chakra-ui/vue'

export default {
  name: 'PkemonPage',
  components: {
    CBadge,
    CBox,
    CDivider,
    CHeading,
    CImage,
    CStack,
    CTabs,
    CTab,
    CTabList,
    CTabPanel,
    CTabPanels,
  },
  data() {
    return {
      pkmnId: 1,
      pokemon: {},
    }
  },

  methods: {
    async handlePokemonSearch(id) {
      const foundPokemon = await this.$api.fetchPokemonById(id)
      const efficacy = await this.$api.fetchPokemonEfficacy(foundPokemon.types)

      this.pokemon = { ...foundPokemon, efficacy }
    },
    damageMultiplierLabel(damage) {
      return damage
    },
  },
  computed: {
    thumbnail() {
      const { id } = this.pokemon
      return id ? `/images/pkmn/icons/${id}.png` : undefined
    },
  },
}
</script>

<style></style>
