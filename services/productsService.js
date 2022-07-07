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

const createSale = async (dataSales) => {
  const newSale = await Promise.all(dataSales.map((item) => productsModel.getById(item.productId)));
  
  const isValidSale = newSale.some((item) => item === null);

  if (isValidSale) return null; 

  const result = await Promise.all(dataSales.map((item) => productsModel.createSale(item)));
 
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  createSale,
};