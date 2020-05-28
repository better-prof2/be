const router = require("express").Router();

const Students = require("./students-model.js");
const { validateStudentId } = require("./students-helper");
const { checkRole } = require("../middleware/role-val");

router.get("/", checkRole("admin"), (req, res) => {
  Students.find()
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", checkRole("admin"), validateStudentId, (req, res) => {
  const { id } = req.params;
  Students.findById(id)
    .then(students => {
      res.status(201).json(students);
    })
    .catch(err => {
      res.status(500).json({ message: "No student found at this ID." });
    });
});

router.get("/:id/messages", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({
      errorMessage: "This ID does not exist"
    });
  }
  Students.findById(id).then(student => {
    if (!student) {
      res.status(404).json({
        errorMessage: "Student does not exist."
      });
    } else {
      Students.findMessages(id)
        .then(messages => {
          if (messages) {
            res.status(200).json({ student, messages });
          } else {
            res
              .status(400)
              .json({ errorMessage: "Could not find this student's messages" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ errorMessage: "Failed to get messages." });
        });
    }
  });

  router.get("/:id/tasks", (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        errorMessage: "This ID does not exist"
      });
    }
    Students.findById(id)
      .then(student => {
        if (!student) {
          res.status(404).json({ err: "No student with this id" });
        } else {
          Students.findTasks(id).then(tasks => {
            if (tasks) {
              res.status(200).json({ student, tasks });
            } else {
              res.status(400).json({
                errorMessage: "Could not find this student's messages"
              });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not retrieve student tasks" });
      });
  });

  router.post("/", (req, res) => {
    const students = { ...req.body };
    Students.add(students)
      .then(student => {
        if (!student.professor_id) {
          res.status(400).json({ error: "Must add a professor id" });
        } else {
          res.status(201).json(student);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not add a student." });
      });
  });
});

router.put("/:id", validateStudentId, (req, res) => {
  const body = { ...req.body };
  const { id } = req.params;

  Students.update(id, body)
    .then(changed => {
      res.status(201).json(changed);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update students at this ID" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Students.remove(id)
    .then(students => {
      res.json(`Student ${students} has been deleted`);
    })
    .catch(err => {
      res.status(500).json({ message: "The student could not be removed" });
    });
});

module.exports = router;