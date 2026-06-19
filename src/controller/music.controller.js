const  musicModel = require('../model/music.model')
const {uploadFile} = require('../services/storage.service');


async function createMusic(req,res) {
    const {title} = req.body;
    const file = req.file;

    if(!title){
        return res.status(400).json({message:"Title is required"})l
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

}

module.exports = { createMusic };