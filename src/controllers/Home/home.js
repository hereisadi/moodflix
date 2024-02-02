const home = (req, res) => {
  return res.status(200).json({ message: "welcome to moodflix api homepage" });
};

module.exports = {
  home,
};
