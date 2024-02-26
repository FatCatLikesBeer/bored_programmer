var express = require('express');
var router = express.Router();

const tag_controller = require('../controllers/tagController.js');

/* GET Tags page: list all tags */
router.get('/', tag_controller.tag_list);

/* GET Create Tag */
router.get('/create', tag_controller.tag_create_get);

/* POST Create Tag */
router.post('/create', tag_controller.tag_create_post);

/* GET Tag Detail */
router.get('/:id', tag_controller.tag_detail);

/* GET DELETE Tag */
router.get('/:id/delete', function(req, res, next) {
  res.send('DELETE TAG GET: Not yet implemented');
});

/* POST DELETE Tag */
router.post('/:id/delete', function(req, res, next) {
  res.send('DELETE TAG POST: Not yet implemented');
});

/* GET UPDATE Tag */
router.get('/:id/update', function(req, res, next) {
  res.send('UPDATE TAG GET: Not yet implemented');
});

/* POST UPDATE Tag */
router.post('/:id/update', function(req, res, next) {
  res.send('UPDATE TAG POST: Not yet implemented');
});

module.exports = router;
