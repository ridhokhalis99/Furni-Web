const { User } = require("../models");
const { convertTokenToPayload } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Invalid Token" };
    }

    const payload = convertTokenToPayload(access_token);
    const { id } = payload;
    const user = await User.findByPk(id);

    if (!user || user.role !== "admin") {
      throw { name: "Invalid Token" };
    }

    req.user = {
      id: user.id,
      username: user.username,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
