const salesService = require('../services/salesService');

const errorMessage = {
  notFound: 'Product not found',
};

const createSale = async (req, res) => {
  const dataSales = req.body;
  const productId = dataSales.some((item) => item.productId === undefined);
  const quantity = dataSales.some((item) => item.quantity === undefined);

  const quantityIsValid = dataSales.some((item) => item.quantity <= 0);

  if (productId) return res.status(400).json({ message: '"productId" is required' });
  if (quantity) return res.status(400).json({ message: '"quantity" is required' });

  if (quantityIsValid) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const result = await salesService.createSale(dataSales);

  if (!result) {
    return res.status(404).json({ message: errorMessage.notFound });
  }

  return res.status(201).json(result);
};

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
  createSale,
  getAll,
  getById,
};