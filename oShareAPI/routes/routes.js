const filesRoutes = require("./files");

const appRouter = (app, express, fs, sharp, path) => {
    const staticRoute = '/static';

    // serve static files
    app.use(staticRoute, express.static(path))

    app.get("/", (req, res) => {
        // console.log(req)
        console.log(path)
        res.send("Hola")
    });

    filesRoutes(app, fs, sharp, staticRoute, path);

};


module.exports = appRouter;