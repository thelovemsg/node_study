const express = require("express");
const router = express.Router();

router.get("/foo", (req, res) => {
  res.status(200).json({ foo: "foo" });
});

router.get("/bar", (req, res) => {
  res.status(200).json({ bar: "bar" });
});

exports.router = router;
