const controller = require('../controllers/image.controller')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname );
    }
  });
const upload = multer({ storage: storage }).single('imageUpload');


module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Acccept"
        );
        next();
    });

    app.post("/api/upload", upload, controller.fileUpload)
};