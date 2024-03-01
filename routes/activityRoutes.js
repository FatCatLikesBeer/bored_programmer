var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');

const activity_controller = require('../controllers/activityController.js');

/* GET Activities page: list all tags */
router.get('/', activity_controller.activity_list);

/* POST Detail TEST Activity */
router.post('/test', activity_controller.testicle);

/* GET Create Activity */
router.get('/create', activity_controller.activity_create_get);

/* POST Create Activity */
router.post('/create', activity_controller.activity_create_post)

/* GET UPDATE Activity */
router.get('/:id/update', activity_controller.activity_update_get);

/* POST Update Activity */
router.post('/:id/update', activity_controller.activity_update_post);

/* GET DELETE Activity */
router.get('/:id/delete', activity_controller.activity_delete_get);

/* POST Delete Activity */
router.post('/:id/delete', activity_controller.activity_delete_post);

/* GET Activity Detail */
router.get('/:id', activity_controller.activity_detail);

module.exports = router;
