require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

let corOptions = {
    origin: 'https://localhost:4001'
}

app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./model/dbmodel.js');

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

db.sequelize.sync({ force: false })

module.exports = app;
