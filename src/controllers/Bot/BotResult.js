/* eslint-disable camelcase */
const { verifyToken } = require("../../middlewares/VerifyToken");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const botResponse = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      let { text } = req.body;
      if (!text) {
        return res.status(400).json({
          error: "payload missing",
        });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }],
        // prompt: text,
        max_tokens: 64,
        // temperature: 0,
        // top_p: 1.0,
        // frequency_penalty: 0.0,
        // presence_penalty: 0.0,
        // stop: ["\n"],
      });
      console.log(response.choices[0].message);
      return res.status(200).json({
        message: "bot response",
        response: response.data.choices[0].message,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "server error",
      });
    }
  });
};

module.exports = {
  botResponse,
};
