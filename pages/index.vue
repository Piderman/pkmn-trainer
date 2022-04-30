<template>
  <div class="container">
    <div>
      <code>{{ typeData }}</code>
    </div>
    <CButton @click="fetchPrintful">call printful</CButton>
    <div>{{ printfulAPI }}</div>
    <CButton @click="fetchPrintfulProxy">call printful proxy</CButton>
    <div>{{ printfulProxy }}</div>
    <hr />
    <CButton @click="fetchAll">all</CButton>
    <CButton @click="fetchFire">fire</CButton>
    <CButton @click="fetchGrass">grass</CButton>
    <CButton @click="fetchWater">water</CButton>
    <CBox
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      h="100vh"
      flex-dir="column"
      justify-content="center"
    >
      <CHeading text-align="center" mb="4"> ⚡️ Hello chakra-ui/vue </CHeading>
      <CFlex justify="center" direction="column" align="center">
        <CBox mb="3">
          <CIconButton
            mr="3"
            :icon="colorMode === 'light' ? 'moon' : 'sun'"
            :aria-label="`Switch to ${
              colorMode === 'light' ? 'dark' : 'light'
            } mode`"
            @click="toggleColorMode"
          />
          <CButton left-icon="info" variant-color="blue" @click="showToast">
            Show Toast
          </CButton>
        </CBox>
        <CAvatarGroup>
          <CAvatar
            name="Evan You"
            alt="Evan You"
            src="https://pbs.twimg.com/profile_images/1206997998900850688/cTXTQiHm_400x400.jpg"
          >
            <CAvatarBadge size="1.0em" bg="green.500" />
          </CAvatar>
          <CAvatar
            name="Jonathan Bakebwa"
            alt="Jonathan Bakebwa"
            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"
          >
            <CAvatarBadge size="1.0em" bg="green.500" />
          </CAvatar>
          <CAvatar
            name="Segun Adebayo"
            alt="Segun Adebayo"
            src="https://pbs.twimg.com/profile_images/1169353373012897802/skPUWd6e_400x400.jpg"
          >
            <CAvatarBadge size="1.0em" bg="green.500" />
          </CAvatar>
          <CAvatar src="pop">
            <CAvatarBadge size="1.0em" border-color="papayawhip" bg="tomato" />
          </CAvatar>
        </CAvatarGroup>
        <CButton
          left-icon="close"
          variant-color="red"
          mt="3"
          @click="showModal = true"
        >
          Delete Account
        </CButton>
        <CModal :is-open="showModal">
          <CModalOverlay />
          <CModalContent>
            <CModalHeader>Are you sure?</CModalHeader>
            <CModalBody>Deleting user cannot be undone</CModalBody>
            <CModalFooter>
              <CButton @click="showModal = false"> Cancel </CButton>
              <CButton
                margin-left="3"
                variant-color="red"
                @click="showModal = false"
              >
                Delete User
              </CButton>
            </CModalFooter>
            <CModalCloseButton @click="showModal = false" />
          </CModalContent>
        </CModal>
      </CFlex>
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CButton,
  CAvatarGroup,
  CAvatar,
  CAvatarBadge,
  CModal,
  CModalContent,
  CModalOverlay,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CIconButton,
  CFlex,
  CHeading
} from '@chakra-ui/vue'

export default {
  name: 'IndexPage',
  components: {
    CBox,
    CButton,
    CAvatarGroup,
    CAvatar,
    CAvatarBadge,
    CModal,
    CModalContent,
    CModalOverlay,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CIconButton,
    CFlex,
    CHeading
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],

  data () {
    return {
      printfulAPI: 'N/A',
      printfulProxy: 'N/A',
      typeData: null,
      showModal: false,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      }
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
    }
  },
  methods: {
    async fetchPrintful() {
      this.printfulAPI = 'loading...'
      await this.$axios.$get('https://api.printful.com/products', {
        headers: {
          "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID,
          Authorization : `Basic ${process.env.PRINTFUL_TOKEN}`
          }
      })
      .then(() => {
        this.printfulAPI = 'loaded'

      })
      .catch(() => {

        this.printfulAPI = 'failed'
        })


    },

    async fetchPrintfulProxy() {
      this.printfulProxy = 'loading...'
      await this.$axios.$get('/api/products')
      .then(() => {
        this.printfulProxy = 'loaded'

      })
      .catch(() => {

        this.printfulProxy = 'failed'
        })
    },

    async fetchAll() {
      const response = await this.$axios.$get('/api/pkmn_types')

      this.typeData = response
    },
    async fetchFire() {
      const response = await this.$axios.$get('/api/pkmn_types/10')

      this.typeData = response
    },
    async fetchGrass() {
      const response = await this.$axios.$get('/api/pkmn_types/12')

      this.typeData = response
    },
    async fetchWater() {
      const response = await this.$axios.$get('/api/pkmn_types/11')

      this.typeData = response
    },
    showToast () {
      this.$toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 10000,
        isClosable: true
      })
    }
  }
}
</script>
