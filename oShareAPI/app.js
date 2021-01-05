const express = require("express");
const fileupload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");

// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

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


app.get("/", (req, res) => {
    console.log(req)
    res.send("Hola")
});


app.post("/single-file", cors(), (req, res) => {

    console.log(!!req.files);
    if(!req.files){
        res.status(500).json({
            status: "error",
            message: "Please upload a file, no file detected"
        })

        return
    }
    const file = req.files.file;
    const path = `${__dirname}/uploads/${file.name}`;

    //move file
    file.mv(path, err=>{
        if(err){
            console.error(err);
            res.writeHead(500, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify({
                status: "error",
                message: err
            }))

            return
        }
        res.writeHead(200, {
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify({
            status: "success",
            message: {
                file: file.name,
                path: path
            }
        }))
    })
});

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


app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});

//https://robkendal.co.uk/blog/how-to-build-a-restful-node-js-api-server-using-json-files