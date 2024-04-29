const dotenv = require('dotenv');
const { application } = require('express');
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const express = require('express');
const app = express();
const Player = require('./models/chelsea.js');

mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})



app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/favorites/new', (req, res) => {
    res.render('favorites/new.ejs')
})

app.use(express.urlencoded({extended: false}));

app.post('/favorites', async (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})