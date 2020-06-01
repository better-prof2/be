const Users = require("./users-model");

function validateUser(user) {
  let errors = [];

  if (!user.fullname || user.fullname.length < 4) {
    errors.push(
      "Please enter a user full name that contains more than 1 character"
    );
  }

  if (!user.username || user.username.length < 2) {
    errors.push("Username must contain at least 4 characters");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Password must contain at least 4 characters");
  }

  if (!user.email || user.email.length < 4) {
    errors.push("Email must contain at least 4 characters");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "User ID not found." });
      }
    })
    .catch(err => res.status(500).json({ err: "Can't get User'" }));
}

function checkDuplicates(req, res, next) {	
  const { username, email } = req.body;	

  Users.findBy({ username })	
    .then(user => {	
      if (user) {	
        res.status(400).json({ message: "Username is already taken" });	
      } else {	
        Users.findBy({ email }).then(user => {	
          if (user) {	
            res.status(400).json({ message: "Email is already taken" });	
          } else {	
            next();	
          }	
        });	
      }	
    })	
    .catch(err => console.log(err));	
}

module.exports = {
  validateUser,
  checkDuplicates,
  validateUserId
};