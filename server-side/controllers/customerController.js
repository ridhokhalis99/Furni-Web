const { Product, Image, Category } = require("../models");

class CustomerController {
  static async readAllProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async readProductDetail(req, res, next) {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId, {
        include: [
          { model: Image, attributes: ["imgUrl"] },
          { model: Category, attributes: ["name"] },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!product) {
        throw { name: "Product Not Found" };
      }
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;
