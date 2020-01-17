const express = require("express");

const router = express.Router();

const Project = require("../helpers/projectModel");

router.get("/", (req, res) => {
  Project.get()
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const userData = req.body;
  Project.insert(userData)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The projects information could not be added" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  Project.get(id).then(resp => {
    if (resp.length === 0) {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }
    Project.update(id, userData)
      .then(resp => {
        Project.get(id).then(response => {
          res.status(200).json(response);
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Project.get(id).then(resp => {
    if (resp.length === 0) {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }
    Project.remove(id)
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The post could not be removed"
        });
      });
  });
});

module.exports = router;
