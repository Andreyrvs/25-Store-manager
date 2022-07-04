const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ';
  const [result] = await connection.execute(query);

  if (result.length === 0) return null;

  return result;
};

module.exports = {
  getAll,
};