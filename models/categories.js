'use strict';

module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categories', {
      business: DataTypes.BOOLEAN,
      entertainment: DataTypes.BOOLEAN,
      health: DataTypes.BOOLEAN,
      science: DataTypes.BOOLEAN,
      sports: DataTypes.BOOLEAN,
      technology: DataTypes.BOOLEAN,
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