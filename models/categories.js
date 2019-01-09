'use strict';

const User = require('./user.js');

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
    created: DataTypes.DATE,
    // Foreign key:
    bar_id: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: User,
        // This is the column name of the referenced model
        key: 'id'
      }
    }
  });
  return Categories;
};
