const { verifyToken } = require("../../middlewares/VerifyToken");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// GET
// text as params
// protected
// endpoint: /sentiment

const sentimentAnalysis = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      let { text } = req.params;
      if (!text) {
        return res.status(400).json({ error: "payload missing" });
      }
      text = text?.trim().toString();

      const result = sentiment.analyze(text);
      return res.status(200).json({ score: result?.score });
      // positive mood for score > 0
      // neutral mood for score = 0
      // negative mood for score < 0
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  });
};

module.exports = {
  sentimentAnalysis,
};
