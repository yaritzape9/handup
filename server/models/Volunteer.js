module.exports = (sequelize, DataTypes) => {
    const Volunteer = sequelize.define("volunteer", {
      volunteer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fname: {
        type: DataTypes.STRING,
      },
      lname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
    });
    return Volunteer;
};

// module.exports = (sequelize, DataTypes) => {
//     class Volunteer extends Model {
//       static define() { 
//         const Volunteer = sequelize.define("volunteer", {
//             fname: {
//                 type: Sequelize.STRING
//             },
//             lname: {
//                 type: Sequelize.STRING
//             },
//             email: {
//                 type: Sequelize.STRING
//             },
//             username: {
//                 type: Sequelize.STRING
//             },
//         });
//       }
//       static associate(models) {
//         Sector.hasMany(models.Sector);
//         // Sector.hasMany(models.Nonprofits);
//       }
//     }
//     return Volunteer;

// }