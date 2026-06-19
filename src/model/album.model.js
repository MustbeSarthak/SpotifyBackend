const mongoose = require('mongoose');

const musicAlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },

    musicUri: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'music',
        }
    ],

    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
});

const MusicAlbum = mongoose.model('Album', musicAlbumSchema);

module.exports = MusicAlbum;