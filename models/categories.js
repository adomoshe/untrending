module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define('Categories', {
    business: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    entertainment: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    health: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    science: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    sports: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    technology: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });
  Categories.associate = (models) => {
    Categories.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Categories;
};

// module.exports = (sequelize, DataTypes) => {
//     const Categories = sequelize.define('Categories', {
//       business: DataTypes.BOOLEAN,
//       entertainment: DataTypes.BOOLEAN,
//       health: DataTypes.BOOLEAN,
//       science: DataTypes.BOOLEAN,
//       sports: DataTypes.BOOLEAN,
//       technology: DataTypes.BOOLEAN,
//     });

// Categories.associate = models => {
//   Categories.belongsTo(models.User, {
//     foreignKey: {
//       allowNull: false
//     }
//   })
// }

//     return Categories;
//   };
