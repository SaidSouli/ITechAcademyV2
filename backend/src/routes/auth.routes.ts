import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { login , me } from "../controllers/login.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/register" , register);
router.post("/login",login);
router.post('/me',requireAuth,me)
export default router;