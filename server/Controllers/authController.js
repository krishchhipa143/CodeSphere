const User = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const nodemailer = require("nodemailer");
require("dotenv").config();


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashed });

    await newUser.save();
    res.status(200).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "2h" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user: { name: user.name, email: user.email, id: user._id },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not Found" });  // ✅ Fix
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codesphereteam@gmail.com",
        pass: "ulne lbwc mqtp qgke",
      },
    });

    transporter.verify((err, success) => {
  if (err) {
    console.error("SMTPVERIFY ERROR:", err);
  } else {
    console.log("SMTP Connection OK");
  }
});

    await transporter.sendMail({
      from: "codesphereteam@gmail.com",
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <p> Click the link below to reset your password </p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.send({ message: "Your reset link has been sent to your email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);  // ✅ Debugging help
    res.status(500).send({ message: "Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
    const {password} = req.body;
    const token = req.params.token;

    try {const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    })

    if(!user) {res.status(400).json({message: "Invalid or Expired Token"})}

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({message: "Password reset Succesfully"})
  } catch (err) {
    console.error(err)
    res.status(500).json({message: "Server Error"})
  }
}
