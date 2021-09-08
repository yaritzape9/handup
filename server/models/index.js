const dbConfig = require("../db/db.js");

require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.nonprofits = require("./Nonprofit.js")(sequelize, Sequelize);
db.sectors = require("./Sector.js")(sequelize, Sequelize);
db.volunteers = require("./Volunteer.js")(sequelize, Sequelize);
db.resources = require("./Resource.js")(sequelize, Sequelize);

db.nonprofits.hasMany(db.resources, { as: "resources" });

db.resources.belongsTo(db.nonprofits, {
  foreignKey: "nonprofit_id",
  as: "nonprofit",
});

db.nonprofits.belongsToMany(db.sectors, {
    through: "nonprofit_sector",
    as: "sectors",
    foreignKey: "sector_id",
});

db.sectors.belongsToMany(db.nonprofits, {
    through: "nonprofit_sector",
    as: "nonprofits",
    foreignKey: "nonprofit_id",
});

db.volunteers.belongsToMany(db.sectors, {
    through: "sector_volunteer",
    as: "sectors",
    foreignKey: "sector_id",
});

db.sectors.belongsToMany(db.volunteers, {
    through: "sector_volunteer",
    as: "volunteers",
    foreignKey: "volunteer_id",
});

module.exports = db;