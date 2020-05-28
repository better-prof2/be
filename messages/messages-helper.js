const Messages = require("./messages-model")

function validateMessageId(req, res, next) {
  const { id } = req.params;

  Messages.findById(id)
    .then(message => {
      if (message) {
        next();
      } else {
        res.status(404).json({ message: "Message ID not found." })
      }
    })
    .catch(err => res.status(500).json({ err: "Could not get Message'" }))
}


module.exports = {
  validateMessageId
}