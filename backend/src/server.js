const express = require("express");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT;
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ServisDesk backend deluje." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
