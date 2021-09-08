const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Nonprofit = sequelize.define("nonprofit", {
      nonprofit_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      nonprofit_name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      money_need: {
        type: DataTypes.INTEGER
      },
    });
  
    return Nonprofit;
};

// module.exports = (sequelize, DataTypes) => {
//     class Nonprofit extends Model {
//         // static define() {
//         //     const Nonprofit = sequelize.define("nonprofit", {
//         //         nonprofit_name: {
//         //         type: Sequelize.STRING
//         //         },
//         //         email: {
//         //         type: Sequelize.STRING
//         //         },
//         //         money_need: {
//         //         type: Sequelize.INTEGER
//         //         },
//         //     });
//         // }
//         static associate(models) {
//             Nonprofit.hasMany(models.Resource);
//             Nonprofit.hasMany(models.Sector);
//         }
//     }
//     Nonprofit.init(
//         {
//           id: {
//             field: 'nonprofit_id',
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//           },
//           name: {
//             field: 'nonprofit_name',
//             type: DataTypes.UUID,
//           },
//           money: {
//             field: 'money_need',
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false,
//           },
//         },
//         {
//           sequelize,
//           timestamps: true,
//           tableName: 'nonprofit',
//           modelName: 'Nonprofit',
//         }
//       );
//     return Nonprofit;
// };