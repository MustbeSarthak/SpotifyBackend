const  musicModel = require('../model/music.model')
const jwt = require('jsonwebtoken');
const {uploadFile} = require('../services/storage.service');


async function createMusic(req,res) {

    const token = req.cookies?.token; // Checking if user is valid or not
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    
    let decoded;
    try{
        // Verifying the role of the artist
        decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({message:"Not Available"})
        }
        
    }catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }

    const {title} = req.body;
    const file = req.file;
    if(!file || !file.buffer){
        return res.status(400).json({ message: "No music file uploaded" })
    }

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id,
    })
    res.status(201).json({
        message: "Music Created Successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
        }
    })
}

module.exports = { createMusic };