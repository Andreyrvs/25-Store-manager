const salesModel = require('../models/salesModel');

const createSale = async (dataSales) => {
  const newSale = await Promise.all(dataSales.map((item) => salesModel.getById(item.productId)));

  const isValidSale = newSale.some((item) => item === null);

  if (isValidSale) return null;

  const result = await salesModel.createSale(dataSales);

  if (!result) return null;

  return result;
};

const getAll = async () => {
  const result = await salesModel.getAll();

  if (!result) return null;

  return result;
};

const getById = async (id) => {
  if (!id) return null;

  const result = await salesModel.getById(id);

  if (!result) return null;

  return result;
};

module.exports = {
  getAll,
  getById,
  createSale,
};