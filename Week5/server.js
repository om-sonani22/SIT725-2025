const express = require("express");
const app = express();
const PORT = 3000;

const foodRoutes = require("./routes/food");

app.use("/api/v4/food", foodRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});