const express = require("express");
require("dotenv/config");
const cors = require("cors");
const app = express();
const usersRoute = require("./routes/usersRoute");

app.use(express.json());
app.use(cors());
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));

app.get("/", (req, res) => {
  res.send({ res: "Artist Management System Backend" });
});

app.all("*", (req, res) => {
  res.status(404).send("Error 404! Endpoint not found!");
});
