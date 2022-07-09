const salesService = require('../services/salesService');

const getAll = async (__req, res) => {
  const result = await salesService.getAll();

  if (!result) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(result); 
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.getById(id);

  if (!result) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
};