<template>
  <div>
    <CHeading as="h1">Manage Party</CHeading>
    <client-only>
      <div v-for="(memberId, index) in party" :key="index">
        <div v-if="memberId">
          <div>{{ memberId }}</div>
          <CButton @click="handleSelectPartySlot(index)">Edit</CButton>
        </div>
        <div v-if="!memberId">
          <CButton @click="handleSelectPartySlot(index)">Add new</CButton>
        </div>
      </div>

      <!-- edit -->
      <div v-if="isManageIndex">
        <search-auto-complete @on-selection="handlePokemonSearch" />
        <CButton @click="handleSavePartySlot">Update</CButton>
        <CButton @click="closeEditSlot">Cancel</CButton>
      </div>

      <!-- party actions -->
      <CButton @click="handleSaveParty">Save Changes</CButton>
      <CButton @click="fetchSavedParty">Load Party</CButton>
    </client-only>
  </div>
</template>

<script>
import { CButton, CHeading } from '@chakra-ui/vue'

// manage party
// deci, lillip, rati, magne, amaura, paras
const PARTY_SIZE = 6

export default {
  name: 'PartyPage',
  components: {
    CButton,
    CHeading,
  },
  data() {
    return {
      party: new Array(6).fill(''),
      manageIndex: -1,
      searchedId: '',
      isManageIndex: false,
    }
  },
  methods: {
    handlePokemonSearch(id) {
      this.searchedId = id
    },

    // when editing existing or adding new, which index will this go into?
    handleSelectPartySlot(index) {
      this.manageIndex = index
      this.isManageIndex = true
    },

    // saves the selected pokemon to the party slot
    handleSavePartySlot() {
      const updatedParty = [...this.party]
      updatedParty[this.manageIndex] = this.searchedId

      this.party = updatedParty

      this.closeEditSlot()
    },

    closeEditSlot() {
      this.searchedId = ''
      this.manageIndex = -1

      this.isManageIndex = false
    },

    // party has been edited, commit all changes
    handleSaveParty() {
      const parsedParty = JSON.stringify(this.party.slice(0, PARTY_SIZE))
      localStorage.setItem('pokemonParty', parsedParty)
    },

    async fetchSavedParty() {
      const savedParty =
        (await JSON.parse(localStorage.getItem('pokemonParty'))) || []

      const party = this.party.map((entry, index) => savedParty[index] || '')

      this.party = party
    },
  },
}
</script>
