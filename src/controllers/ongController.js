const connectiom = require('./../database/connection')
const generateId = require('./../utils/generateId')

module.exports = {
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body

    const id = generateId()

    try {
      const ong = await connectiom('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
      })

      return res.status(201).json({ id })
    } catch (err) {
      console.error(err)

      return res.status(500).json({
        err,
      })
    }
  },

  async index(req, res) {
    const ongs = await connectiom('ongs').select(
      'name',
      'email',
      'whatsapp',
      'city',
      'uf',
    )

    return res.json(ongs)
  },
}
