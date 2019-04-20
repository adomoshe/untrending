module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    googleId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return User;
};

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     googleId: DataTypes.STRING,
//     username: DataTypes.STRING,
//     firstname: DataTypes.STRING,
//     lastname: DataTypes.STRING
//   });
//   return User;
// };
