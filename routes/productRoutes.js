import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { userAuth, adminAuth } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();
router.route("/")
  .get(getAllProducts)
  .post(userAuth, adminAuth, createProduct);

router.route("/top")
  .get(getTopProducts);

router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(userAuth, adminAuth, checkObjectId, updateProduct)
  .delete(userAuth, adminAuth, checkObjectId, deleteProduct);

router.route("/:id/reviews")
  .post(userAuth, checkObjectId, createProductReview);

export default router;
