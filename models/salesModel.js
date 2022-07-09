const connection = require('../helpers/connection');

const DATABASE = 'StoreManager';

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
  
  const result = await connection.execute(query, [id]);

  if (result[0].length === 0 || !result[0]) return null;

  return result[0];
};

module.exports = {
  getAll,
  getById,
};