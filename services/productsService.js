const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();

  if (!result) return [];

  return result;
};

module.exports = {
  getAll,
};