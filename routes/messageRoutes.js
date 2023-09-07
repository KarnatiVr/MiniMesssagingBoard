const express = require('express');
const messageControllers = require('../Controllers/PageController');

const router = express.Router();

router.get('/create',messageControllers.message_create_get);
router.get('/',messageControllers.message_index);
router.post('/', messageControllers.message_create_post);
router.get('/:id', messageControllers.message_details);
router.delete('/:id', messageControllers.message_delete);

module.exports=router;