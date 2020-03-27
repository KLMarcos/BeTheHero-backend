const connectiom = require('./../database/connection')

module.exports = {
  async index(req, res) {
    const { authorization: ong_id } = req.headers

    const incidents = await connectiom('incidents')
      .where('ong_id', ong_id)
      .select('*')

    return res.json(incidents)
  },
}
