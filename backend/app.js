const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const DBconnection = require('./db/db');
DBconnection();
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes');
const cookieparser = require('cookie-parser');

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',userRoutes);
app.use('/captains',captainRoutes);


module.exports = app;