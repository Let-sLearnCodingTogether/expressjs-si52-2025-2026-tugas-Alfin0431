
const express = require('express');

const authRoute = require('./route/authRoute');
const termRoute = require('./route/termRoute');

const app = express();


app.use(express.json()); 

app.use('/api/auth', authRoute); 
app.use('/api/terms', termRoute); 


app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

module.exports = app;