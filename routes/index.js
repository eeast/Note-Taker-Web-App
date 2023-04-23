const express = require('express');

const notes = require('./notes');
const route2 = require('./route2');

const app = express();

app.use('/notes', notes)
app.use('/route2', route2);

module.exports = app;