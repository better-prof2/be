const router = require("express").Router();

const Projects = require("./projects-model");
const { validateProjectId } = require("./projects-helper");

router.get("/", (req, res) => {
  Projects.find()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => res.send(err));
});

router.get("/:id", (req, res) => {
  Projects.find();
  const id = req.params.id;
  if (!id) {
    res
      .status(404)
      .json({ message: "The project with the specified id does not exist." });
  } else {
    Projects.findById(id)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The project information could not be retrieved." });
      });
  }
});


router.post("/", (req, res) => {
  const body = { ...req.body };
  Projects.add(body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error adding project" });
    });
});

router.put("/:id", validateProjectId, (req, res) => {
  const body = { ...req.body };
  const { id } = req.params;
  Projects.update(id, body)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not update project." });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  Projects
    .remove(id)
    .then(project => {
      res
        .status(200)
        .json({ message: `Project at id ${id} was deleted.` });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not delete project" });
    });
});


module.exports = router;