const connection = require('../helpers/connection');

const DATABASE = 'railway';

const create = async (name) => {
  const query = `INSERT INTO ${DATABASE}.products (name)
  VALUES (?);`;

  const [result] = await connection.execute(query, [name]);

  return {
    id: result.insertId,
    name,
  };
};

const deleteProduct = async (id) => {
  const query = `DELETE FROM ${DATABASE}.products WHERE id = ?`;

  const [result] = await connection.execute(query, [id]);

  if (result.length === 0) return null;

  return result;
};

const getAll = async () => {
  const query = `SELECT * FROM ${DATABASE}.products;`;
  const [result] = await connection.execute(query);

  if (result.length === 0) return null;

  return result;
};

const getById = async (idp) => {
  const query = `SELECT * FROM ${DATABASE}.products WHERE id = ?;`;

  const [result] = await connection.execute(query, [idp]);

  if (result.length === 0 || !result) return null;
  
  return result[0];
};

const updateById = async (id, name) => {
  const query = `
  UPDATE ${DATABASE}.products
  SET name = ?
  WHERE products.id = ?`;

  const [result] = await connection.execute(query, [name, id]);

  if (result.length === 0) return null;

  return {
    id,
    name,
  };
};

module.exports = {
  create,
  deleteProduct,
  getAll,
  getById,
  updateById,
};