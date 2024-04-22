const express = require("express");
require("dotenv/config");
const cors = require("cors");
const app = express();
const adminRoute = require("./routes/adminRoute");
const usersRoute = require("./routes/usersRoute");
const artistsRoute = require("./routes/artistsRoute");
const songsRoute = require("./routes/songsRoute");

app.use(express.json());
app.use(cors());
app.use("/api/admin", adminRoute);
app.use("/api/users", usersRoute);
app.use("/api/artists", artistsRoute);
app.use("/api/songs", songsRoute);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));

app.get("/", (req, res) => {
  res.send({ res: "Artist Management System Backend" });
});

app.all("*", (req, res) => {
  res.status(404).send("Error 404! Endpoint not found!");
});
