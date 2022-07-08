const connection = require('../helpers/connection');

const DATABASE = 'StoreManager';

const getAll = async () => {
  const query = `SELECT * FROM ${DATABASE}.sales`;

  const [sales] = await connection.execute(query);

  return sales;
};

module.exports = {
  getAll,
};