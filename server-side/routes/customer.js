const router = require("express").Router();
const CustomerController = require("../controllers/customerController");
const errorHandler = require("../middlewares/errorHandler");

router.get("/products", CustomerController.readAllProducts);
router.get("/products/:productId", CustomerController.readProductDetail);
router.use(errorHandler);

module.exports = router;
