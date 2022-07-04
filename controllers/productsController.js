const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const result = await productsService.getAll();

  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(result);
};

module.exports = {
  getAll,
};