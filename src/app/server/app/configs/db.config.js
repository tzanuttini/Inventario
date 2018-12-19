const env = require('./env.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.usuario, env.clave, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  paranoid: false,
  logging: false,
  pool: {
    max: env.max,
    min: env.min,
    acquire: env.acquire,
    idle: env.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.env = env;

require('../models/@asociaciones')(db, sequelize, Sequelize);

module.exports = db;