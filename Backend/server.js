const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();

console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("PORT =", process.env.PORT);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Job Tracker Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});