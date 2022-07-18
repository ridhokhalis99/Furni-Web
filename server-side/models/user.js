"use strict";
const { Model } = require("sequelize");
const { encryptPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, {
        foreignKey: "authorId",
        onDelete: "Cascade",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Email can't be empty` },
          notEmpty: { msg: `Email can't be empty` },
          isEmail: { msg: `Email must be in email format` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Password can't be empty` },
          notEmpty: { msg: `Password can't be empty` },
          minPass(value) {
            if (value === null || this.password.length < 5) {
              throw new Error("Password must be at least 5 characters");
            }
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, option) => {
    instance.password = encryptPassword(instance.password);
  });
  return User;
};
