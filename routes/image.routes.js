const controller = require('../controllers/image.controller')



module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Acccept"
        );
        next();
    });

    app.post("/api/upload", [], controller.fileUpload)
};