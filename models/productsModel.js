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
  // console.log(idp);
  const [result] = await connection.execute(query, [idp]);

  if (result.length === 0 || !result) return null;

  // console.log('SALE', result[0]);
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

const createSale = async (dataSales) => {
  const querySale = `
    INSERT INTO 
    ${DATABASE}.sales (date)
    VALUES (NOW())`;

  const [sale] = await connection.execute(querySale);

  const querySalesProduct = `
  INSERT INTO
  ${DATABASE}.sales_products (sale_id, product_id, quantity)
  VALUES ?`;
  
  const row = [sale.insertId, dataSales.productId, dataSales.quantity];

  console.log('Row', row);

  const productSale = await connection.execute(querySalesProduct, [[row]]);

    console.log('dentro da func', productSale);
  if (!productSale) return null;
  
  return productSale;
};

module.exports = {
  getAll,
  getById,
  create,
  createSale,
};