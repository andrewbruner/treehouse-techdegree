// import express module and set up main app
const express = require('express');
const app = express();

// import data.json file
const data = require('./data.json');

// import path module
const path = require('path');

// set 'view engine' to 'pug'
app.set('view engine', 'pug');