const Projects = require("./projects-model");
// custom middleware
function validateProjectId(req, res, next) {
  Projects.find(req.params.id)
    .then(checkId => {
      if (checkId) {
        req.checkId = checkId;
        next();
      } else {
        res.status(404).json({ error: "Project ID may not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not verify deadline ID" });
    });
}

module.exports = {
  validateProjectId
}