var express = require('express');
var router = express.Router();

/* GET Activities page: list all tags */
router.get('/', function(req, res, next) {
  res.render('activity_list', { title: 'Activity List' });
});

/* GET Create Activity */
router.get('/create', function(req, res, next) {
  res.send('CREATE ACTIVITY GET: Not yet implemented');
});

/* POST Create Activity */
router.post('/create', function(req, res, next) {
  res.send('CREATE ACTIVITY POST: Not yet implemented');
});

/* GET Activity Detail */
router.get('/:id', function(req, res, next) {
  res.send('ACTIVITY DETAIL GET: Not yet implemented');
});

/* GET DELETE Activity */
router.get('/:id/delete', function(req, res, next) {
  res.send('DELETE ACTIVITY GET: Not yet implemented');
});

/* POST DELETE Activity */
router.post('/:id/delete', function(req, res, next) {
  res.send('DELETE ACTIVITY POST: Not yet implemented');
});

/* GET UPDATE Activity */
router.get('/:id/update', function(req, res, next) {
  res.send('UPDATE ACTIVITY GET: Not yet implemented');
});

/* POST UPDATE Activity */
router.post('/:id/update', function(req, res, next) {
  res.send('UPDATE ACTIVITY POST: Not yet implemented');
});

module.exports = router;
