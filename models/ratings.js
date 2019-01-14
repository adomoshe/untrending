'use strict';

module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define('User', {
    siteId: DataTypes.STRING,
    conservativeRating: DataTypes.STRING,
    reliabilityRating: DataTypes.STRING
  });
  return Ratings;
};