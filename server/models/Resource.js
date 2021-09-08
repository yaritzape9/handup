module.exports = (sequelize, DataTypes) => {
    const Resource = sequelize.define("resource", {
      resource_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      resource_name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    });
    return Resource;
};


// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Resource extends Model {
//     // static define() {
//     //     const Resource = sequelize.define("resource", {
//     //         resource_name: {
//     //         type: Sequelize.STRING
//     //         },
//     //     });
//     // }
//     static associate(models) {
//       Resource.belongsTo(models.Nonprofit, {as: 'nonprofit'});
//     }
//   }
//   Resource.init(
//     {
//       id: {
//         field: 'resource_id',
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       name: {
//         field: 'resource_name',
//         type: DataTypes.UUID,
//       },
//       money: {
//         field: 'money_need',
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       timestamps: true,
//       tableName: 'nonprofit',
//       modelName: 'Nonprofit',
//     }
//   );
//   return Resource;
// };
