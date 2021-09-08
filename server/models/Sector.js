module.exports = (sequelize, DataTypes) => {
    const Sector = sequelize.define("sector", {
      sector_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sector_name: {
        type: DataTypes.STRING,
      },
    });
    return Sector;
};

// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//     class Sector extends Model {
//     //   static define() { 
//     //     const Sector = sequelize.define("sector", {
//     //         sector_name: {
//     //         type: Sequelize.STRING
//     //         },
//     //     });
//     //   }
//       static associate(models) {
//         Sector.hasMany(models.Volunteers);
//         Sector.hasMany(models.Nonprofits);
//       }
//     }
//     Sector.init(
//         {
//           id: {
//             field: 'sector_id',
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//           },
//           name: {
//             field: 'nonprofit_name',
//             type: DataTypes.UUID,
//           },
//         },
//         {
//           sequelize,
//           timestamps: true,
//           tableName: 'nonprofit',
//           modelName: 'Nonprofit',
//         }
//       );
//     return Sector;

// }