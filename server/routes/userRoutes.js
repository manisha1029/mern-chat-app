import express from "express";

import { loginUser, registerUser, getAllUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/
router.get("/", protect ,getAllUsers);
router.post("/register", registerUser);
router.post("/login",  loginUser);
  

export default router;
