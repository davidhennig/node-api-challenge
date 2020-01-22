const express = require("express");

const projects = require("./data/router/projects");

const actions = require("./data/router/actions");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello from the server");
});

server.use("/api/projects", projects);

server.use("/api/actions", actions);

module.exports = server;
