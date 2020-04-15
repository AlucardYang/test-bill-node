var mysql = require('mysql');

// 私隐信息
var DataBase = mysql.createConnection({
  // host: '127.0.0.1',
  // user: 'root',
  // password: '******',
  // database: 'bill'
});

DataBase.connect();

module.exports = DataBase;