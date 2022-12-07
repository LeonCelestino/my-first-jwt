const { checkDuplicateUsernameOrEmail } = require("../middleware");
const controller = require('../controllers/auth.controller');
const db = require("../model/dbmodel");
const User = db.users;
const bcrypt = require("bcryptjs")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            checkDuplicateUsernameOrEmail,
        ],
        (req, res) => {
            console.log('request: ' + req)
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
            })
                .then(user => {
                    res.send({ message: "user registred succesfully!" })
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        }
    );

    app.post("/api/auth/signin", controller.signin);
};