const express = require("express");
const { signup, login, forgotPassword, resetPassword, createHelpRequests, getAllHelpRequests } = require("../Controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/reset-password/:token",resetPassword);
router.post("/create-help-requests", authMiddleware, createHelpRequests);
router.get("/get-help-requests", authMiddleware, getAllHelpRequests);

// Example protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: "You are authenticated!", user: req.user });
});

module.exports = router;
