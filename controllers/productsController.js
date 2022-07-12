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

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const isExist = await productsService.getById(id);

  if (!isExist) {
    return res.status(404).json({ message: errorMessage.notFound });
  }

  await productsService.deleteProduct(id);

  return res.status(204).end();
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
  deleteProduct,
  getAll,
  getById,
  updateById,
};