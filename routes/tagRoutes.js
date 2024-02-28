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
router.get('/:id/delete', tag_controller.tag_delete_get);

/* POST DELETE Tag */
router.post('/:id/delete', tag_controller.tag_delete_post);

/* GET UPDATE Tag */
router.get('/:id/update', tag_controller.tag_update_get);

/* POST UPDATE Tag */
router.post('/:id/update', tag_controller.tag_update_post);

module.exports = router;
