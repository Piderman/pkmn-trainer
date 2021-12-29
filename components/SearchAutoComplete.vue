<template>
  <div>
    <CFormControl>
      <CStack>
        <CFormLabel for="id_Lookup">Search Pokemon:</CFormLabel>
        <CInput v-model="queryModel" name="id_Lookup" />
        <CStack v-if="isShowResults">
          <CButton
            v-for="{ identifier, id } in autocompleteResults"
            :key="`autocomplete_${id}`"
            v-text="identifier"
            @click="handleSelection(id)"
          />
        </CStack>
      </CStack>
    </CFormControl>
  </div>
</template>

<script>
import {
  CFormControl,
  CFormLabel,
  CInput,
  CButton,
  CStack,
} from '@chakra-ui/vue'

import { debounce } from 'lodash'

export default {
  name: 'SearchAutoComplete',
  components: {
    CFormControl,
    CFormLabel,
    CInput,
    CButton,
    CStack,
  },
  data() {
    return {
      // todo: move to state?
      pkmnLookup: [],
      autocompleteResults: [],
      queryModel: '', // pika
      id: '',
      isShowResults: false,
    }
  },
  async fetch() {
    const allPkmn = await this.$content('pkmn/pokemon')
      .fetch()
      .catch(() => [])

    this.pkmnLookup = allPkmn
  },
  methods: {
    async fetchPokemonResults(query) {
      const results = await this.$content('pkmn/pokemon')
        .where({
          identifier: { $regex: query },
        })
        .fetch()
        .catch(() => [])

      this.autocompleteResults = results

      this.isShowResults = true
    },
    handleSelection(id) {
      this.$emit('on-selection', id)
      this.isShowResults = false
    },
  },
  watch: {
    queryModel: {
      handler: debounce(function (query) {
        if (!query) {
          this.isShowResults = false
          return (this.autocompleteResults = [])
        }
        this.fetchPokemonResults(query)
      }, 200),
    },
  },
}
</script>
