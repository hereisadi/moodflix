const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      console.error("Missing token");
      return res.status(401).json({ error: "Missing token" });
    }

    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);
    req.user = decoded;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (error) {
    console.error("error in verifying the token", error);
    return res
      .status(401)
      .json({ error: "Something went wrong to verify the token" });
  }
};

module.exports = {
  verifyToken,
};
