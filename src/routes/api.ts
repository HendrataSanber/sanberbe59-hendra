import express from "express";

import uploadMiddleware from "../middlewares/upload.middleware";
import uploadController from "../controllers/upload.controller";
import productsController from "../controllers/products.controller";
import categoriesController from "../controllers/categories.controller";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import rbacMiddleware from "../middlewares/rbac.middleware";
import ordersController from "../controllers/orders.controller";

const router = express.Router();

// Auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
// router.post("/auth/me", authMiddleware, authController.me);
router.post(
    "/auth/me",
    [authMiddleware, rbacMiddleware(["admin"])],
    authController.me
  );
router.put("/auth/update-profile", authMiddleware, authController.updateProfile);

// CRUD Categories
router.get("/categories", categoriesController.findAll);
router.post("/categories", categoriesController.create);
router.get("/categories/:id", categoriesController.findOne);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);
// /categories/:id -> parameter
// /categories?page=1&limit=10&search=kemeja -> query url

router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

router.post("/orders", authMiddleware, ordersController.create);
router.get("/orders", ordersController.findAll);
router.get("/orders/:id", ordersController.findOne);

export default router;
