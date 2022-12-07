require("dotenv").config();
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser")


const verifyToken = (req, res, next) => {
    const token = req.cookies["access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    try {
        const validToken = jwt.verify(token, process.env.TOKEN_KEY);
        if (validToken) {
            req.authenticated = true;
            return next();
        }

    } catch (err) {
        return res.status(400).json({ message: "something is wrong with your token" })
    }

};

module.exports = {
    verifyToken: verifyToken
}