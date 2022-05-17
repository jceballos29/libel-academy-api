/** @format */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const databaseConnection = require('./config/database');

const app = express();
const accessLogStream = fs.createWriteStream(path.resolve("access.log"), {flags: 'a'});
app.use(cors());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./app/uploads'));


app.use('/api', require('./routes'));

databaseConnection();

module.exports = app;
