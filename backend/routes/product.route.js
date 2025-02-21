import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getProductBYId, getProducts, postProducts, updateProduct,deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/products",getProducts);
router.get("/products/:id",getProductBYId)
router.post("/products",protectRoute,postProducts);
router.put("/products/:id",protectRoute,updateProduct);
router.delete("/products/:id",protectRoute,deleteProduct);

export default router;