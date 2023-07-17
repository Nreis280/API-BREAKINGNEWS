import { Router } from "express";
const router = Router();

import newsController from "../controllers/news.controller.js";
import  {authMiddleware}  from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware ,newsController.create);
router.get("/", newsController.findAll);
router.get("/top", newsController.topNews);
router.get("/:id", newsController.findeById);
export default router;
