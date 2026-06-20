const express = require('express');
const musicController = require('../controller/music.controller');
const authArtist = require('../middlewares/auth.middleware');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage
})


const router = express.Router()

router.post('/upload', authArtist , upload.single('music'),  musicController.createMusic);
router.post('/album', authArtist, musicController.createAlbum);
router.get('/search/music', musicController.searchMusic);
router.get('/search/album', musicController.searchAlbum)


module.exports = router;