const db = require("../model/dbmodel");
const User = db.users;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
require("dotenv").config();

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_KEY, {
                expiresIn: 86400 // 24 hours
            });

            res.cookie("access-token", token, {
                maxAge: 86400
            })



            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};



exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
