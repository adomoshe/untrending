'use strict';

module.exports = (sequelize, DataTypes) => {
  const Keywords = sequelize.define('User', {
    keyWord: DataTypes.STRING,
    siteIds: DataTypes.STRING,
  });

  Keywords.associate = models => {
    Keywords.belongsTo(models.Ratings, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Keywords;
};