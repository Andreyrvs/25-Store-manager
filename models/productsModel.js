const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [result] = await connection.execute(query);

  if (result.length === 0) return null;

  return result;
};

const getById = async (idp) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  
  const [result] = await connection.execute(query, [idp]);

  if (result.length === 0) return null;

  const { id, name } = result[0];
  return {
    id, 
    name,
  };
};

const create = async (name) => {
  const query = `INSERT INTO StoreManager.products (name)
  VALUES (?);`;

  const [result] = await connection.execute(query, [name]);

  return {
    id: result.insertId,
    name,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};