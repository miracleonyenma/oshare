const express = require("express");
const axios = require("axios");
const expressFile = require("express-fileupload");

const app = express();


app.get("/", (req, res) => {
    console.log(req)
    res.send("Hola")
});

app.post("/single-file", (req, res)=>{
    const file = req.files.file;
    const path = __dirname + '/files' + file.name;

    console.log(file.name);
})

// This is needed because otherwise the server can’t parse file uploads.
app.use(expressFile);


app.listen(3000, ()=>{
    console.log("app running on localhost:3000")
});