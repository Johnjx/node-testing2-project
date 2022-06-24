const express = require("express");
const server = express();
const classes = require('./wow-classes/model');

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get('/classes', (req, res, next) => {
  classes.findAll()
  .then(result => res.json(result))
  .catch(next)
});

server.post('/classes', (req, res) => {
  res.send('Hello from wow-classes post route');
});

server.get('/classes/:id', (req, res) => {
  res.send('Hello from wow-classes get by ID route');
});

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
