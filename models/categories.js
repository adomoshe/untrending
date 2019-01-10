'use strict';

module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categories', {
      business: DataTypes.BOOLEAN,
      entertainment: DataTypes.BOOLEAN,
      general: DataTypes.BOOLEAN,
      health: DataTypes.BOOLEAN,
      science: DataTypes.BOOLEAN,
      sports: DataTypes.BOOLEAN,
      technology: DataTypes.BOOLEAN,
      created: DataTypes.DATE
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