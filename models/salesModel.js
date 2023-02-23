const connection = require('../helpers/connection');

const DATABASE = 'railway';

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

const getAll = async () => {
  const query = `
    SELECT SP.sale_id AS saleId, S.date, SP.product_id AS productId, SP.quantity
    FROM ${DATABASE}.sales_products AS SP
    INNER JOIN ${DATABASE}.sales as S
    ON SP.sale_id = S.id
    ORDER BY SP.sale_id ASC, SP.product_id ASC`;

  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (id) => {
  const query = `
    SELECT S.date, SP.product_id AS productId, SP.quantity
    FROM ${DATABASE}.sales_products AS SP
    INNER JOIN ${DATABASE}.sales as S
    ON SP.sale_id = S.id
    WHERE S.id = ?
    ORDER BY SP.sale_id ASC, SP.product_id ASC`;
  
  const [result] = await connection.execute(query, [id]);

  if (result.length === 0) return null;

  return result;
};

module.exports = {
  getAll,
  getById,
  createSale,
};