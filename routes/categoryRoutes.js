var express = require('express');
var router = express.Router();

const category_controller = require('../controllers/categoryController.js');

/* GET Categories page: list all tags */
router.get('/', category_controller.category_list);

/* GET Create Category */
router.get('/create', category_controller.category_create_get);

/* POST Create Category */
router.post('/create', category_controller.category_create_post);

/* GET DELETE Category */
router.get('/:id/delete', category_controller.category_delete_get);

/* POST DELETE Category */
router.post('/:id/delete', category_controller.category_delete_post);

/* GET UPDATE Category */
router.get('/:id/update', category_controller.category_update_get);

/* POST UPDATE Category */
router.post('/:id/update', category_controller.category_update_post);

/* GET Category Detail */
router.get('/:id', function(req, res, next){
	res.send("not yet working")
} );

module.exports = router;
