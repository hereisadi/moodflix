const { SignUpModel } = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmail } = require("../../middlewares/isEmail");
require("dotenv").config();

const login = async (req, res) => {
  isEmail(req, res, async () => {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "payload missing" });
      }

      email = email?.toLowerCase().trim().toString();
      password = password?.trim().toString();

      const user = await SignUpModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "user does not exists" });
      }

      const isPassowrdMatch = await bcrypt.compare(password, user.password);
      if (!isPassowrdMatch) {
        return res.status(400).json({ error: "wrong password" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "720h" }
      );

      res.status(200).json({ success: true, message: "Login done", token });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "server error" });
    }
  });
};

module.exports = {
  login,
};
