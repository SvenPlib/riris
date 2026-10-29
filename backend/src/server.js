const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/request");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ServisDesk backend deluje." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
