let express = require('express');
let router = express.Router();
let multer = require('multer');
let sharp = require('sharp');
let fs = require('fs');
const replaceColor = require('replace-color')

exports.fileUpload = (req, res) => {
  console.log(req.file);
  console.log("Start processing")

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname );
    }
  });

  let upload = multer({ storage: storage }).single('imageUpload');

   sharp(req.file.path)
    .trim()
    .toFile(`public/uploads/thumb/trim${req.file.originalname}.png`, function (err, info) {
      if(!err) {
      console.log("Trimmed successfully")
          replaceColor({
          image: `public/uploads/thumb/trim${req.file.originalname}.png`,
          colors: {
            type: 'hex',
            targetColor: '#FFFFFF',
            replaceColor: '#00000000'
          },
          deltaE: 10
        })
          .then((jimpObject) => {
          console.log("Jimp'd")
            jimpObject.write(`public/uploads/thumb/jimp${req.file.originalname}.png`, (err) => {
              if (!err) {
                const contents = fs.readFileSync(`public/uploads/thumb/jimp${req.file.originalname}.png`)
                res.write(contents)

                res.end();
              }
              else {
                res.write("KUPA");
                res.end()
              }
            })
          })
          .catch((err) => {
            console.log(err)
            res.write("KUPA");
            res.end()
          })
        }
        else {
          res.write("KUPA");
          res.end()
        }
      });
  };