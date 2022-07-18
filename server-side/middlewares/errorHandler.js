function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";
  const { name } = err;

  if (name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors.map((error) => error.message);
  } else if (name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "Email must be unique";
  } else if (name === `Email Is Required` || name === `Password Is Required`) {
    code = 400;
    msg = name;
  } else if (name === "Invalid Username/Password") {
    code = 401;
    msg = name;
  } else if (name === "Product Not Found" || name === "Category Not Found") {
    code = 404;
    msg = name;
  } else if (name === "Invalid Token" || name === "JsonWebTokenError") {
    code = 401;
    msg = "Access Token Is Invalid";
  }

  res.status(code).json({
    statusCode: code,
    message: msg,
  });
}

module.exports = errorHandler;
