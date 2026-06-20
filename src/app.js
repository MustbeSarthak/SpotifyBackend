const express = require('express');
const authRoutes = require('./routes/register.routes');
const musicRoutes = require('./routes/music.routes')
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json()); // Parse json bodies
app.use(cookieParser()); // Parse Cookies 


app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);


module.exports = app;