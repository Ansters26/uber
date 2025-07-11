const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const DBconnection = require('./db/db');
DBconnection();
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
const cookieparser = require('cookie-parser');
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);


module.exports = app;