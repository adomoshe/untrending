'use strict';

module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categories', {
      world: DataTypes.BOOLEAN,
      politics: DataTypes.BOOLEAN,
      economy: DataTypes.BOOLEAN,
      business: DataTypes.BOOLEAN,
      tech: DataTypes.BOOLEAN,
      markets: DataTypes.BOOLEAN,
      sports: DataTypes.BOOLEAN,
      us: DataTypes.BOOLEAN,
      entertainment: DataTypes.BOOLEAN,
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