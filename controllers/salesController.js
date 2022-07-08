const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const result = await salesService.getAll();

  if (!result) return res.status(400).json({ message: 'Deu ruim no Controler' });
  return res.status(200).json(result); 
};

module.exports = {
  getAll,
};