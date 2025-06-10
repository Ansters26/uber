const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const DBconnection = require('./db/db');
DBconnection();
const userRoutes = require('./routes/user.routes')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',userRoutes);


module.exports = app;