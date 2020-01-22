const express = require("express");

const router = express.Router();

const Action = require("../helpers/actionModel");

router.get("/", (req, res) => {
  Action.get()
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const userData = req.body;
  Action.insert(userData)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The actions information could not be added" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  Action.get(id).then(resp => {
    if (resp.length === 0) {
      res
        .status(404)
        .json({ message: "The actions with the specified ID does not exist." });
    }
    Action.update(id, userData)
      .then(resp => {
        Action.get(id).then(response => {
          res.status(200).json(response);
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The actions information could not be modified."
        });
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Action.get(id).then(resp => {
    if (resp.length === 0) {
      res
        .status(404)
        .json({ message: "The actions with the specified ID does not exist." });
    }
    Action.remove(id)
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The action could not be removed"
        });
      });
  });
});

module.exports = router;
