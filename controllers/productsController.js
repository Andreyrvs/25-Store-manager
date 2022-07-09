const productsService = require('../services/productsService');

const errorMessage = {
  notFound: 'Product not found',
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const result = await productsService.create(name);

  if (!result) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  return res.status(201).json(result);
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

  const result = await productsService.createSale(dataSales);

  if (!result) {
    return res.status(404).json({ message: errorMessage.notFound });
  }

  return res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await productsService.getAll();

  if (!result) {
    return res.status(404).json({ message: errorMessage.notFound });
  }
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await productsService.getById(id);

  if (!result) {
    return res.status(404).json({ message: errorMessage.notFound });
  }
  return res.status(200).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params; 
  const { name } = req.body;

  if (name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const isNameValid = await productsService.getById(id);
  
  if (!isNameValid) return res.status(404).json({ message: errorMessage.notFound });
  
  const result = await productsService.updateById(id, name);
    
  if (!result) {
    return res.status(404).json({ message: errorMessage.notFound });
  }

  return res.status(200).json(result);
};

module.exports = {
  create,
  createSale,
  getAll,
  getById,
  updateById,
};