const cors = require("cors");

const filesRoutes = (app, fs, path) => {
    app.get("/files", (req, res)=>{

        const getData = (val, callback) => {
            fs.readdir(val, (err, files)=>{
                return err ? callback(err, null) : callback(null, files);
            });
        }

        getData(path, (err, data) => {
            if(err){
                res.status(500).json({
                    status: "error",
                    message: "err"
                })
            } else{
                res.status(200).json({
                    status: "success",
                    message: "files retrieved successfully",
                    data: data
                })
            }
        })

        // res.status(200).json({
        //     status: "success",
        //     message: "files retrieved successfully",
        //     data: files
        // })
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
        const filePath = `${path}${file.name}`;

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

            res.status(200).json({
                status: "success",
                message: `${file.name} added succesfully`,
                data: {
                    file: file.name,
                    path: filePath
                }
            })
        })
    });

};

module.exports = filesRoutes;