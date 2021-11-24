const { default: svgr } = require("@svgr/core");
const { default: prettier } = require("@svgr/plugin-prettier");
const { default: jsx } = require("@svgr/plugin-jsx");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.type("application/json");
  next();
});

app.get("/", (req, res) => {
  svgr(req.body, { plugins: [jsx, prettier] })
    .then((result) => {
      res.send({
        statusCode: 200,
        body: JSON.stringify(result),
      });
    })
    .catch((error) => {
      res.send({
        statusCode: 200,
        body: JSON.stringify(error.message),
      });
    });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
