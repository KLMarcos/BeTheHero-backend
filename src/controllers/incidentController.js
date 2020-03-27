const connection = require('./../database/connection');

module.exports = {
  async create(req, res) {
    const { title, description, value } = req.body;

    const { authorization: ong_id } = req.headers;

    const [item] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json(item);
  },

  async remove(req, res) {
    const { id } = req.params;
    const { authorization: ong_id } = req.headers;

    const incident = await connection('incidents')
      .select('ong_id')
      .where('id', id)
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({
        error: 'Operation unauthorized',
      });
    }

    await connection('incidents')
      .where('id', id)
      .delete();

    return res.status(204).send();
  },

  async index(req, res) {
    const incidents = await connection('incidents').select('*');

    return res.json(incidents);
  },
};
