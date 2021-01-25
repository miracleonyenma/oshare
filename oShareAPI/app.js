const express = require("express");
const fileupload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const sharp = require("sharp");

// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' });

const path = `${__dirname}/uploads/`;

const port = `3000`;

const app = express();


app.use(express.json());

//Parse URL-encoded bodies
// app.use(express.urlencoded({extended: true}));

// This is needed because otherwise the server can’t parse file uploads.
app.use(fileupload());

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb)=>{
//         cb(null, file.mimetype + Date.now)
//     }
// });

// const upload = multer({storage : storage});


// app.post('/uploadfile', cors(), upload.single('myFile'), (req, res, next) => {
//     const file = req.file
//     console.log(file)
//     if (!file) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file);
// })

const routes = require('./routes/routes.js')(app, express, fs, sharp, path);


app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});

//https://robkendal.co.uk/blog/how-to-build-a-restful-node-js-api-server-using-json-files