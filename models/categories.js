'use strict';

module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categories', {
      business: DataTypes.BOOLEAN,
      entertainment: DataTypes.BOOLEAN,
<<<<<<< HEAD
=======
      general: DataTypes.BOOLEAN,
>>>>>>> f6615666a2936e18e40b91622d75d03662460473
      health: DataTypes.BOOLEAN,
      science: DataTypes.BOOLEAN,
      sports: DataTypes.BOOLEAN,
      technology: DataTypes.BOOLEAN,
<<<<<<< HEAD
=======
      created: DataTypes.DATE
>>>>>>> f6615666a2936e18e40b91622d75d03662460473
    });
  
      Categories.associate = models => {
        Categories.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
      }
  
    return Categories;
  };