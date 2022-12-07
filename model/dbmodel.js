const { Sequelize, DataTypes } = require("sequelize");
const database = require("../config/database");

const sequelize = new Sequelize(
    database.DATABASE,
    database.USER,
    database.PASSWORD, {
    host: database.HOST,
    dialect: database.dialect,

    pool: {
        max: database.pool.max,
        min: database.pool.min,
        acquire: database.pool.acquire,
        idle: database.pool.idle
    }
}
)


sequelize.authenticate()
    .then(() => {
        console.log("Connected...")
    })
    .catch((err) => {
        console.error(err)
    });


const db = {
    users: sequelize.define('User', {
        userid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        username: {
            type: DataTypes.STRING,
            unique: 'compositeIndex',
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            unique: 'compositeIndex',
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;