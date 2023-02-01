const express = require("express")
const multer = require("multer");
const path = require('path');
const fs = require('fs');

var maxSize = 1 * 1000 * 1000;

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        fs.mkdirSync("uploads/", { recursive: true })
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback({ message: 'Failed to save file, only images are allowed'})
        }
        callback(null, true)
    },
    limits:{
        fileSize: maxSize
    }
}).single("testFile")

const uploadController = express.Router();

const postImage = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
          res.status(400).send(err).end();
          return;
        }
    
        res.send({ filename: req.file.filename }).end();
    })
    
}

const getImages = (req, res) => {
    const directoryPath = path.join(__dirname, '../../uploads');

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(404).end();
            return;
        }
        res.send({ files }).end();
    });
}

uploadController.post("/upload", postImage);
uploadController.get("/upload",  getImages);

module.exports = uploadController;