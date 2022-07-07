const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();

  if (!result) return null;

  return result;
};

const getById = async (id) => {
  if (!id) return null;

  const result = await productsModel.getById(id);

  if (!result) return null;
  return result;
};

const isValid = (name) => {
  if (typeof name !== 'string') return false;
  
  return true;
};

const create = async (name) => {
  const isNameValid = isValid(name);

  if (!isNameValid) return null;
  
  const result = await productsModel.create(name);

  return result;
};

const createSale = async ({ productId, quantity }) => {
  const isValidProductId = await productsModel.getById(productId);

  if (!isValidProductId) return null;

  const result = await productsModel.createSale({ productId, quantity });

  if (!result) return null; 
 
  return result;
};

// createSale(4, 22);

module.exports = {
  getAll,
  getById,
  create,
  createSale,
};