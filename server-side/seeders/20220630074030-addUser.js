"use strict";
const { encryptPassword } = require("../helpers/bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/users.json");
    const users = data.map((user) => {
      user.createdAt = user.updatedAt = new Date();
      user.password = encryptPassword(user.password);
      return user;
    });

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
