var express = require('express');
var router = express.Router();
var Bill = require('../controller/bill');

// 获取账单列表
router.get('/api/test/list', function (req, res, next) {
  Bill.spendList(req.query, function (results) {
    let total = 0;
    let income = 0;
    console.log(results);
    results && results.forEach(spend => {
      total += spend.total;
      income += spend.income;
    });
    res.json({
      code: 0,
      data: {
        spend: results,
        total: total,
        income: income
      },
      msg: 'success'
    });
  });
});

// 获取账单列表
router.get('/api/test/hundred', function (req, res, next) {
  Bill.spendHunderd(req.query, function (err, results) {
    if (err) {
      throw err;
    };

    res.json({
      code: 0,
      data: results,
      msg: 'success'
    });
  });
});

// 新建账单
router.post('/api/test/add', function (req, res, next) {
  console.log(req.body);
  Bill.spendAdd(req.body, function (err, results) {
    if (err) {
      throw err;
    };

    console.log((results && results[0]) || {});
    res.json({
      code: 0,
      data: (results && results[0]) || {},
      msg: 'success'
    });
  });
});

// 删除账单
router.post('/api/test/delete', function (req, res, next) {
  Bill.spendDelete(req.body, function (err, results) {
    if (err) {
      throw err;
    };

    res.json({
      code: 0,
      data: results,
      msg: 'success'
    });
  });
});

// 更新账单
router.post('/api/test/update', function (req, res, next) {
  Bill.spendUpdate(req.body, function (err, results) {
    if (err) {
      throw err;
    };

    res.json({
      code: 0,
      data: results,
      msg: 'success'
    });
  });
});

module.exports = router;