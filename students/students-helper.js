const Students = require("./students-model")

function validateStudentId(req, res, next) {
  const { id } = req.params

  Students.findById(id)
    .then(student => {
      if (student) {
        next()
      } else {
        res.status(404).json({ message: "Student ID not found." })
      }
    })
    .catch(err => res.status(500).json({ err: "Could not get Student" }))
}


module.exports = {
  validateStudentId
}
