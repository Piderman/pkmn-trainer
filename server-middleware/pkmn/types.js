const { $content } = require('@nuxt/content')

const app = require('express')()

const getAllTypeData = async () => {
  const { body } = await $content('pkmn/types')
    .fetch()
    .catch(() => {
      body: []
    })

  return body
}

app.get('/', async (_, res) => {
  const payload = await getAllTypeData()

  res.json({ data: payload })
})

app.get('/:id', async (req, res) => {
  const { id } = req.params

  const allTypes = await getAllTypeData()
  const payload = allTypes.find((entry) => entry.id === id)

  res.json({ data: payload })
})

module.exports = app
