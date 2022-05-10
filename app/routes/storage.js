const express = require('express');
const cors = require('cors')
const storageController = require('../controllers/storage');
const upload = require('../utils/handleStorage');

const router = express.Router();


router.get('/', storageController.getAllStorageItems);
router.get('/:id', storageController.getStorageItem);
router.post('/', cors(), upload.single('file'), storageController.createStorageItem);


module.exports = router;