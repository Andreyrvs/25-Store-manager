const salesModel = require('../models/salesModel');

const getAll = async () => {
  const result = await salesModel.getAll();

  if (!result) return null;

  return result;
};

module.exports = {
  getAll,
};