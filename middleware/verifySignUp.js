const db = require('../model/dbmodel.js');
const User = db.users;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) return res.status(400).send({ message: "username already exists!" });

    const findEmail = await User.findOne({ where: { email: req.body.email } });
    if (findEmail) return res.status(400).send({ message: "email already exists" });

    next();
}

module.exports = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
} 