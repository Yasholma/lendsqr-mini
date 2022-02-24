require("dotenv").config();
const express = require("express");
const { userRoutes, authRoutes } = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 9900;

app.get("/", (req, res) => {
  res.status(200).send("Hello World!!!");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
