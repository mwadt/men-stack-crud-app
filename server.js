const dotenv = require('dotenv');
const { application } = require('express');
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const Player = require('./models/chelsea.js');
const { GridFSBucketWriteStream } = require('mongodb');

mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/favorites/new', (req, res) => {
    res.render('favorites/new.ejs')
})

app.get('/favorites', async (req, res) => {
    const allPlayers = await Player.find();
    res.render('favorites/index.ejs', { 
        players: allPlayers })
})

app.get('/favorites/:playerId', async (req, res) => {
    const playerId = await Player.findById(req.params.playerId);
    res.render('favorites/show.ejs', {
        players: playerId
    })
    
})

app.get('/favorites/:playerId/edit', async (req, res) => {
    const playerId = await Player.findById(req.params.playerId);
    res.render('favorites/edit.ejs', {
        players: playerId
    })
})

app.post('/favorites', async (req, res) => {
    console.log(req.body);
    
    const createdPlayers = await Player.create(req.body);
    res.redirect('/favorites')
})

app.put('/favorites/:playerId/edit', async (req, res) => {
    const editPlayer = await Player.findByIdAndUpdate(req.params.playerId)
    res.redirect(`/fruits/${req.params.playerId}`)
})

app.delete('/favorites/:playerId', async (req, res) => {
    const deletePlayer = await Player.findByIdAndDelete(req.params.playerId);
    res.redirect('/favorites');
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})