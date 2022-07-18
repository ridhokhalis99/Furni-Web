const { User, Product, Image, Category, sequelize } = require("../models");
const { convertPayloadToToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class AdminController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Email Is Required" };
      }
      if (!password) {
        throw { name: "Password Is Required" };
      }
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw { name: "Invalid Username/Password" };
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Invalid Username/Password" };
      }
      const payload = {
        id: user.id,
      };
      const token = convertPayloadToToken(payload);
      res.status(200).json({
        access_token: token,
        username: user.username,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addAdmin(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const userInput = {
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      };
      await User.create(userInput);
      res.status(201).json({
        message: "Admin has been added successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async readAllProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          { model: Image, attributes: ["imgUrl"] },
          { model: Category, attributes: ["name"] },
          { model: User, attributes: ["username", "email"] },
        ],
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

  static async readProductById(req, res, next) {
    try {
      const { productId } = req.params;
      const product = await Product.findByPk(productId, {
        include: [
          { model: Image, attributes: ["imgUrl"] },
          { model: Category, attributes: ["name"] },
          { model: User, attributes: ["username"] },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async createProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        overview,
        description,
        price,
        mainImg,
        categoryId,
        Images,
      } = req.body;
      const productInput = {
        name,
        overview,
        description,
        price: +price,
        mainImg,
        authorId: req.user.id,
        categoryId: +categoryId,
      };
      const product = await Product.create(productInput, { transaction: t });
      const imageInput = Images.map((image) => {
        return { imgUrl: image.imgUrl, productId: product.id };
      });
      await Image.bulkCreate(imageInput, { transaction: t });

      await t.commit();
      res.status(201).json({
        message: "Product has been added successfully",
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        overview,
        description,
        price,
        mainImg,
        categoryId,
        Images,
      } = req.body;
      const productInput = {
        name,
        overview,
        description,
        price: +price,
        mainImg,
        categoryId: +categoryId,
      };
      const { productId } = req.params;
      const productFound = await Product.findByPk(productId);
      if (!productFound) {
        throw { name: "Product Not Found" };
      }
      await Product.update(productInput, {
        where: {
          id: productId,
        },
        transaction: t,
        individualHooks: true,
      });
      const imageInput = Images.map((image) => {
        return { imgUrl: image.imgUrl, productId };
      });
      await Image.destroy({
        where: {
          productId,
        },
        transaction: t,
      });
      await Image.bulkCreate(imageInput, { transaction: t });
      await t.commit();
      res.status(200).json({
        message: "Product has been updated successfully",
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { productId } = req.params;
      const productFound = await Product.findByPk(productId);
      if (!productFound) {
        throw { name: "Product Not Found" };
      }
      await Product.destroy({
        where: {
          id: productId,
        },
      });
      res.status(200).json({
        message: "Product has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async readAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      });
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async readCategoryById(req, res, next) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByPk(categoryId, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const categoryInput = {
        name,
      };
      await Category.create(categoryInput);
      res.status(201).json({
        message: "Category has been added successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { name } = req.body;
      const { categoryId } = req.params;
      const categoryInput = {
        name,
      };
      const categoryFound = await Category.findByPk(categoryId);
      if (!categoryFound) {
        throw { name: "Category Not Found" };
      }
      await Category.update(categoryInput, {
        where: {
          id: categoryId,
        },
      });
      res.status(201).json({
        message: "Category has been updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      await Category.destroy({
        where: {
          id: categoryId,
        },
      });
      res.status(200).json({
        message: "Category has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
