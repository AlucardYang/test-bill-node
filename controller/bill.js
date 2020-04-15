const DataBase = require('./bill-data-base');
const common = require('./common');

//账单列表
function spendList(query, callback) {
  let list = [];
  let maxDay = common.getDaysInMonth(parseInt(query['year']), parseInt(query['month']));
  for (let i = maxDay; i >= 1; i--) {
    list.push({
      day: i
    });
  }
  list.forEach((item, index) => {
    item.bill = [];
    let month = (query['month'].length === 2 ? query['month'] : '0' + query['month']);
    let day = (String(item.day).length === 2 ? item.day : '0' + item.day);
    let sql = 'select * from spend_test';
    sql += ' where date > ' + new Date(query['year'] + '-' + month + '-' + day + ' 00:00:00').getTime() + ' and date < ' + new Date(query['year'] + '-' + month + '-' + day + ' 23:59:59').getTime();
    if (query['sort']) {
      sql += ' and sort in (' + query['sort'] + ')';
    }
    sql += ' order by date desc';
    // console.log(sql);
    DataBase.query(sql, (err, results, fields) => {
      item.bill = results ? results : [];
      item.total = 0;
      item.income = 0;
      item.bill.forEach(bill => {
        bill.type === 0 && (item.total += bill.price);
        bill.type === 1 && (item.income += bill.price);
      });
      if (list.length - 1 === index) {
        list = list.filter(value => value.bill.length > 0);
        // console.log(list);
        callback(list);
      }
    });
  });
}

// 超过一百的支出
function spendHunderd(query, callback) {
  // console.log(query);
  let maxDay = common.getDaysInMonth(parseInt(query['year']), parseInt(query['month']));
  let month = (query['month'].length === 2 ? query['month'] : '0' + query['month']);
  let sql = 'select * from spend_test';
  sql += ' where date > ' + new Date(query['year'] + '-' + month + '-' + '01 00:00:00').getTime() + ' and date < ' + new Date(query['year'] + '-' + month + '-' + maxDay + ' 23:59:59').getTime();
  sql += ' and price >= 100 and type = 0';
  if (query['sort']) {
    sql += ' and sort in (' + query['sort'] + ')';
  }
  sql += ' order by price desc';
  // console.log(sql);
  DataBase.query(sql, (err, results, fields) => {
    callback(err, results);
  });
}

// 添加账单
function spendAdd(body, callback) {
  console.log(body);
  let id = common.guid();
  let time = new Date().getTime();
  DataBase.query('insert into spend_test (id, name, price, sort, date, create_time, update_time, type) values ("' + id + '","' + body.name + '",' + body.price + ', ' + body.sort + ',' + body.date + ',' + time + ',' + time + ',' + body.type + ')', (err, results, fields) => {
    DataBase.query('select * from spend_test where id like "' + id + '"', (err1, results1, fields1) => {
      callback(err1, results1);
    });
  });
}

// 更新账单
function spendUpdate(body, callback) {
  let time = new Date().getTime();
  DataBase.query('update spend_test set price = ' + body.price + ', update_time = ' + time + ' where id = "' + body.id + '"', (err, results, fields) => {
    DataBase.query('select * from spend_test where id like "' + body.id + '"', (err1, results1, fields1) => {
      callback(err1, results1);
    });
  });
}

// 删除账单
function spendDelete(body, callback) {
  DataBase.query('delete from spend_test where id = "' + body.id + '"', (err, results, fields) => {
    callback(err, results);
  });
}

module.exports = {
  spendList,
  spendHunderd,
  spendAdd,
  spendDelete,
  spendUpdate,
}