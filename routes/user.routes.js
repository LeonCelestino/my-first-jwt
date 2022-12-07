const { verifyJWT } = require("../middleware");
const controller = require("../controllers/auth.controller");
const cookieParser = require("cookie-parser")

module.exports = function (app) {
    app.use(cookieParser());

    app.get(
        "/api/test/user",
        [verifyJWT],
        controller.userBoard
    );

};