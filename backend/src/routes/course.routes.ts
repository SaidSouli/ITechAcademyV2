import { Router } from "express";
import { enrollCourse, getCourses, myCourses, showCourse } from "../controllers/course.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
const router = Router()

router.get("/",requireAuth,getCourses);
router.get("/enrolled",requireAuth,myCourses);
router.get("/:id",requireAuth,showCourse);
router.post("/:id/enroll",requireAuth,enrollCourse)

export default router;