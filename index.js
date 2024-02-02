const app = require("./src/app");
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
