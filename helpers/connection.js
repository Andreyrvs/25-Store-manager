const mysql = require('mysql2/promise');
require('dotenv').config(); // não se esqueça de configurar suas variáveis de ambiente aqui na configuração

const connection = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
}); 

module.exports = connection;