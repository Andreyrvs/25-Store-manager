const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const result = await productsService.getAll();

  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ message: 'Ok' });
};

module.exports = {
  getAll,
};