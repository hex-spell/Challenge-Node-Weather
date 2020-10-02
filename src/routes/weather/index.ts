import { Router } from "express";

const weather = Router();

weather.get("/", (req, res) => {
  res.send("Weather endpoint working");
});

export default weather;
