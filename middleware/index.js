const verifyJWT = require("./verifyJwt");
const verifySignUp = require("./verifySignUp")

module.exports = {
    verifyJWT: verifyJWT.verifyToken,
    checkDuplicateUsernameOrEmail: verifySignUp.checkDuplicateUsernameOrEmail
}