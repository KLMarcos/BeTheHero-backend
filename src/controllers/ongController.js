const crypto = require('crypto');

const connectiom = require('./../database/connection');

module.exports = {
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    try {
      const ong = await connectiom('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
      });

      return res.status(201).json({ id });
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        err,
      });
    }
  },

  async index(req, res) {
    const ongs = await connectiom('ongs').select('*');

    return res.json(ongs);
  },
};
