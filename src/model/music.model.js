const mongoose = require('mongoose');

// Music Schema
const musicSchema = new mongoose.Schema({
    title: {
        type:String,
        trim:true,
        required: true,
    },

    musicUri: {
        type:String,
        required:true
    },

    artist: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},
    {
        timestamps: true,
})

const musicModel = mongoose.model("music", musicSchema);

module.exports = musicModel