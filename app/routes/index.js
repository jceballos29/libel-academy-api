/** @format */

const express = require('express');
const fs = require('fs');
const router = express.Router();

const removeExtension = (file) => {
  return file.split('.').shift();
};

console.log('Initiating routes...');
fs.readdirSync(__dirname).filter((file) => {
  const filename = removeExtension(file);
  if (filename !== 'index') {
    console.log(`Route: /${filename}`);
    router.use(`/${filename}`, require(`./${filename}`));
  }
});

module.exports = router;
