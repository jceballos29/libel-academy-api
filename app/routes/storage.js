const express = require('express');
const storageController = require('../controllers/storage');
const upload = require('../utils/handleStorage');

const router = express.Router();


router.get('/', storageController.getAllStorageItems);
router.get('/:id', storageController.getStorageItem);
router.post('/', upload.single('file'), storageController.createStorageItem);


module.exports = router;