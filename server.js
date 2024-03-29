const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const dbConfig = require("./config/db.config");

const Role = db.role;


const app = express();

let corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/image.routes')(app);

app.get('/', (req, res) => {
    res.json({ message: "Henlo"});
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count ===0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("Added 'user' to roles collection,")
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if(err) {
                    console.log('error', err);
                }
                console.log("Added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Succesfully connct to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});