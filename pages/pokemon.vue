<template>
  <CBox p="4">
    <CHeading as="h1">Testing Pkmn</CHeading>
    <CFormControl>
      <CStack>
        <CFormLabel for="id_Lookup">Pokemon id:</CFormLabel>
        <CInput name="id_Lookup" v-model="pkmnId" />
        <CButton @click="handlePokemonSearch">Search</CButton>
      </CStack>
    </CFormControl>
    <CDivider my="4" />
    <CStack v-if="pokemon">
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
    </CStack>
  </CBox>
</template>

<script>
import {
  CBox,
  CBadge,
  CButton,
  CDivider,
  CHeading,
  CImage,
  CInput,
  CFormControl,
  CFormLabel,
  CStack,
} from '@chakra-ui/vue'

export default {
  name: 'PkemonPage',
  components: {
    CBox,
    CBadge,
    CButton,
    CDivider,
    CHeading,
    CImage,
    CFormControl,
    CFormLabel,
    CInput,
    CStack,
  },
  data() {
    return {
      pkmnId: 1,
      pokemon: null,
    }
  },

  methods: {
    async handlePokemonSearch() {
      const foundPokemon = await this.$api.fetchPokemonById(this.pkmnId)

      this.pokemon = foundPokemon
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
