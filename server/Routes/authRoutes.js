const express = require("express");
const { signup, login } = require("../Controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Example protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: "You are authenticated!", user: req.user });
});

module.exports = router;
