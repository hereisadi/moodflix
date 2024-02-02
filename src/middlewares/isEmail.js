const isEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const trimmedEmail = email.trim();
  if (trimmedEmail.includes("@")) {
    next();
  } else {
    return res.status(400).json({
      error: "Invalid email",
    });
  }
};

module.exports = {
  isEmail,
};
