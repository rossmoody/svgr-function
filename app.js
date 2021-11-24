const { default: svgr } = require("@svgr/core");
const { default: prettier } = require("@svgr/plugin-prettier");
const { default: jsx } = require("@svgr/plugin-jsx");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.type("text/html");
  next();
});

app.use(bodyParser.text({ type: "*/*" }));

app.post("/", (req, res) => {
  svgr(req.body, { plugins: [jsx, prettier] })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
