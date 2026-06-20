const MusicAlbum = require('../model/album.model');
const  musicModel = require('../model/music.model')
const {uploadFile} = require('../services/storage.service');


async function createMusic(req,res) {
    const {title} = req.body;
    const file = req.file;

    if(!title){
        return res.status(400).json({message:"Title is required"})
    }
    if(!file || !file.buffer){ 

        // If no file is uploaded normally or in RAM 
        return res.status(400).json({ message: "No music file uploaded" })
    }

    const result = await uploadFile(file.buffer.toString('base64')) // Uploading music 

    // Uploading music in DB
    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.decoded.id,
    })

    res.status(201).json({
        message: "Music Created Successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: req.decoded.id,
        }
    })
}

// ALbum
async function createAlbum(req,res){
    const {title , musicIds } = req.body;
    
    const album = await MusicAlbum.create({
        title,
        artist: req.decoded.id,
        musicUri: musicIds,
    })

    res.status(201).json({
        message: "Album has been succesfully created",
        album:{
            id: album._id,
            title: album.title,
            artist: album.artist,
            music: album.musicUri,
        }
    })

}


// GET Music
async function searchMusic(req,res) {
    const {title} = req.query;

    const music = await musicModel.find({
        title: {
            $regex: title,
            $options: "i",
        }
    });
    res.status(200).json({music})
}

// GET album
async function searchAlbum(req,res){
    const {title} = req.query;

    const album = await MusicAlbum.find({
        title:{
            $regex: title,
            $options: "i",
        }
    });
    res.status(200).json({album})
}

module.exports = { createMusic, createAlbum, searchMusic, searchAlbum };