module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmpty(val, next) {
          if (val.length >= 1) return next();
          return next('name cannot be empty');
        },
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmpty(val, next) {
          if (val.length >= 1) return next();
          return next('name cannot be empty');
        },
      },
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['Developer', 'Mentor', 'Admin'],
      defaultValue: 'Developer',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    mobileNumber: DataTypes.STRING,
    githubHandle: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verifiedUser: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['Yes', 'No'],
      defaultValue: 'No',
    },
    session: DataTypes.STRING,
    verificationCode: DataTypes.STRING,
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
