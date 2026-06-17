const {ImageKit} = require('@imagekit/nodejs')

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
    const result = await ImageKit.Files.upload({
        file,
        fileName:"music_" + Date.now(),
        folder: "Spotify_Music_Backend",
    })
    return result;
}

module.exports = { uploadFile }