const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    position: String,
    appearances: Number,
    goals: Number,
    img: String

})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;