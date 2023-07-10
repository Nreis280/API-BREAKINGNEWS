import {Router} from "express";
const router = Router();

import authControler from "../controllers/auth.controller.js";

router.post("/", authControler.login)

export default router;