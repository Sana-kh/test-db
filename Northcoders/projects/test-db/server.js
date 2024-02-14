const express = require ('express')
const cors = require ('cors')
const multer = require('multer')
const mongoose = require('mongoose');
const path = require('path');

const app = express()
app.use(cors())
app.use(express.json())


const url = 'mongodb+srv://00:00000@cluster0.rhfchzm.mongodb.net/?retryWrites=true&w=majority'
const conn = mongoose.createConnection(url);

const videoSchema = new mongoose.Schema({
    filename: String,
    path: String
});

const VideoModel = conn.model('Video', videoSchema);


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, './videos')
    },
    filename: function(req, file, cb){
        return cb(null, file.originalname)
    },
})

const upload = multer({storage})


app.post('/upload', upload.single('file'), async(req, res) =>{
  try{
    const video = new VideoModel({
        filename: req.file.originalname,
        path: req.file.path,
    })
    await video.save();
        res.status(200).send("video saved")
  } catch (error) {
    console.error(error);
    res.status(500).send('error saving video');
}
})

app.get('/videos/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'videos', filename);
    res.sendFile(filePath);
  });

app.listen(8000, () =>{
    console.log("server started")
})
