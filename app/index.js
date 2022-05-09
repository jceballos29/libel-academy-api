/** @format */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const databaseConnection = require('./config/database');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./app/uploads'));

app.use('/api', require('./routes'));

databaseConnection();

module.exports = app;
