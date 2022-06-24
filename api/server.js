const express = require("express");
const server = express();

server.use(express.json());

server.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not found" });
});

server.use((err, req, res, next) => {// eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
});

module.exports = server;
