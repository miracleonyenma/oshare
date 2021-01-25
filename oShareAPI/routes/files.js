const cors = require("cors");
const VideoThumbnail = require('video-thumbnail-generator').default;

const filesRoutes = (app, fs, sharp, staticRoute, path) => {
    app.get("/files", cors(), (req, res)=>{

        const getData = (val, callback) => {
            fs.readdir(val, (err, files)=>{
                return err ? callback(err, null) : callback(null, files);
            });
        }

        getData(path, (err, files) => {
            if(err){
                res.status(500).json({
                    status: "error",
                    message: "err"
                });

                console.log(err)
            } else{
                getData(`${path}thumb/`, (err, thumbs) => {
                    if(err){
                        console.log(err)
                        res.status(500).json({
                            status: "error",
                            message: `unable to get thumbnail - ${err}`
                        })
                    } else {
                        // files.forEach(file => {
                        //     fs.stat(`${path}${file}`, (err, data) => {
                        //         console.log(data);
                        //     })
                        // });
                        res.status(200).json({
                            status: "success",
                            message: "files and thumbnails retrieved successfully",
                            data: {
                                files : files,
                                thumbs: thumbs
                            }
                        })
                    }
                });
            }
        })

        // res.status(200).json({
        //     status: "success",
        //     message: "files retrieved successfully",
        //     data: files
        // })
    });

    app.post("/single-file", cors(), (req, res) => {

        console.log(req.files)
        console.log(!!req.files);
        if(!req.files){
            res.status(500).json({
                status: "error",
                message: "Please upload a file, no file detected"
            })

            return
        }
        const file = req.files.file;
        console.log(file);
        const filePath = `${path}${file.name}`;
        let fileUrl = `static/${file.name}`;
        const thumbPath = `${path}thumb/${file.name}`;
        let thumbUrl = `static/imageThumb.png`;

        //move file
        file.mv(filePath, err=>{
            if(err){
                console.error(err);

                res.status(500).json({
                    status: "error",
                    message: err
                })

                return
            }
            try{

                // if(file.mimetype.split('/')[0] == 'video'){
                //     const tg = new VideoThumbnail({
                //         sourcePath: filePath,
                //         thumbnailPath: thumbPath
                //     });

                //     tg.generateCb((err, result) => {
                //         if(err){
                //             console.error(err);
                //         } else{
                //             console.log(result);
                //         }
                //     })
                // } else {
                    sharp(filePath).resize(200, 200).toFile(thumbPath, (err, resizeImage) => {
                        if(err){
                            console.log(err);
                            thumbUrl = `static/thumb/${file.mimetype.split('/')[0]}.png`;
                            console.log(thumbUrl);

                            res.status(200).json({
                                status: "success",
                                message: `only ${file.name} was added succesfully`,
                                data: {
                                    file: file.name,
                                    path: filePath,
                                    url: fileUrl,
                                    thumb : {
                                        thumbPath: thumbPath,
                                        thumbUrl: thumbUrl
                                    }
                                }
                            })

                        } else {
                            console.log(resizeImage);
                            thumbUrl = `static/thumb/${file.name}`;
                            console.log(thumbUrl);

                            res.status(200).json({
                                status: "success",
                                message: `${file.name} and thumbnail created succesfully`,
                                data: {
                                    file: file.name,
                                    path: filePath,
                                    url: fileUrl,
                                    thumb : {
                                        thumbPath: thumbPath,
                                        thumbUrl: thumbUrl
                                    }
                                }
                            })
                        }
                    })
                // }
            } catch (err){
                console.error(err);
                res.status(500).json({
                    status: "error",
                    message: err
                })
            }

        });

    });

};

module.exports = filesRoutes;