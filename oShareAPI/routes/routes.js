const filesRoutes = require("./files");

const appRouter = (app, fs, path) => {

    app.get("/", (req, res) => {
        console.log(req)
        res.send("Hola")
    });

    filesRoutes(app, fs, path);

}

module.exports = appRouter;