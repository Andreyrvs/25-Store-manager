const connection = require('../helpers/connection');

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

const createSale = async (productId, quantity) => {
  const querySale = `INSERT INTO StoreManager.sales (date)
    VALUES (NOW())`;

  const [sale] = await connection.execute(querySale);

  const querySalesProduct = `INSERT INTO StoreManager.sales_products 
  (sale_id ,product_id, quantity)
    VALUES (?, ?, ?)`;
  const [productSale] = await connection.execute(
    querySalesProduct, [sale.insertId, productId, quantity],
);

  console.log('dentro da func', productSale);
  return sale;
};

// createSale(3, 22);
module.exports = {
  getAll,
  getById,
  create,
  createSale,
};