const connection = require('./../database/connection')

module.exports = {
  async create(req, res) {
    const { title, description, value } = req.body

    const { authorization: ong_id } = req.headers

    const [item] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    })

    return res.json(item)
  },

  async remove(req, res) {
    const { id } = req.params
    const { authorization: ong_id } = req.headers

    const incident = await connection('incidents')
      .select('ong_id')
      .where('id', id)
      .first()

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({
        error: 'Operation unauthorized',
      })
    }

    await connection('incidents')
      .where('id', id)
      .delete()

    return res.status(204).send()
  },

  async index(req, res) {
    const { page = 1 } = req.query

    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ])

    res.header('X-Total-Count', count['count(*)'])
    return res.json(incidents)
  },
}
