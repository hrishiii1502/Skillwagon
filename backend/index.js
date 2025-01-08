import express from "express";
import configureDB from "./config/db.js";
const app = express();
const port = 4000;
app.use(express.json());
configureDB();

app.get("/home", (req, res) => {
  res.json({
    message: "home page",
  });
});

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
