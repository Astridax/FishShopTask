var express = require('express');
var router = express.Router();
var fishInShop = require('../public/javascripts/data.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(fishInShop);
  res.render('index', { title: 'Fish Shop', fishInShop });
});

module.exports = router;
