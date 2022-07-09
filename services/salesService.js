const salesModel = require('../models/salesModel');

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
};