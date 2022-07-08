const connection = require('../helpers/connection');

const DATABASE = 'StoreManager';

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

const create = async (name) => {
  const query = `INSERT INTO ${DATABASE}.products (name)
  VALUES (?);`;

  const [result] = await connection.execute(query, [name]);

  return {
    id: result.insertId,
    name,
  };
};

const querySale = `
  INSERT INTO 
  ${DATABASE}.sales (date)
  VALUES (NOW())`;

  const querySalesProduct = `
  INSERT INTO
  ${DATABASE}.sales_products (sale_id, product_id, quantity)
  VALUES (?,?,?)`;
  
const createSale = async (dataSales) => {
  const [sale] = await connection.execute(querySale);

  const productSale = await Promise.all(dataSales.map((item) => 
    connection.execute(querySalesProduct, [sale.insertId, item.productId, item.quantity])));

  if (!productSale) return null;

  return {
    id: sale.insertId,
    itemsSold: dataSales,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  createSale,
};