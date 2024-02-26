var express = require('express');
var router = express.Router();

/* GET Categories page: list all tags */
router.get('/', function(req, res, next) {
  res.render('category_list', { title: 'Category List' });
});

/* GET Create Category */
router.get('/create', function(req, res, next) {
  res.send('CREATE CATEGORY GET: Not yet implemented');
});

/* POST Create Category */
router.post('/create', function(req, res, next) {
  res.send('CREATE CATEGORY POST: Not yet implemented');
});

/* GET Category Detail */
router.get('/:id', function(req, res, next) {
  res.send('CATEGORY DETAIL GET: Not yet implemented');
});

/* GET DELETE Category */
router.get('/:id/delete', function(req, res, next) {
  res.send('DELETE CATEGORY GET: Not yet implemented');
});

/* POST DELETE Category */
router.post('/:id/delete', function(req, res, next) {
  res.send('DELETE CATEGORY POST: Not yet implemented');
});

/* GET UPDATE Category */
router.get('/:id/update', function(req, res, next) {
  res.send('UPDATE CATEGORY GET: Not yet implemented');
});

/* POST UPDATE Category */
router.post('/:id/update', function(req, res, next) {
  res.send('UPDATE CATEGORY POST: Not yet implemented');
});

module.exports = router;
