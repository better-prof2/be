const bcrypt = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config/secrets')

const { checkDuplicates, validateUser } = require("../users/users-helper");

const Users = require("../users/users-model");
const Students = require("../students/students-model");

//REGISTER PROFESSOR

router.post("/register", checkDuplicates, (req, res) => {
  let user = req.body;

  const validateResult = validateUser(user);
  
  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    
    const token = generateToken(user);
    Users.add(user)
      .then(saved => {
        if (user.username && user.lastname && user.firstname && user.password && user.email) {
          res.status(201).json({token: token,
            message: `Welcome Professor ${user.lastname}`, ...user, token });
        } else {
          res
            .status(404)
            .json({ message: "Missing info. User requires a username, lastname, firstname, password and email" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Registration error." });
      });
  } else {
    res.status(400).json({
      message: "Invalid user info",
      errors: validateResult.errors
    });
  }
});

//REGISTER STUDENT

router.post("/register/:id", checkDuplicates, (req, res) => {
  let user = req.body;

  if (!user.lastname || user.lastname.length < 2) {
    return res.status(400).json({ message: "User lastname of at least two letters is required" });
  }

  if (!user.firstname || user.firstname.length < 2) {
    return res.status(400).json({ message: "User firstname of at least two letters is required" });
  }
  if (!user.username || user.username.length < 2) {
    return res.status(400).json({ message: "Username of at least two characters is required" });
  }

  if (!user.password || user.password.length < 4) {
    return res.status(400).json({ message: "Password of at least two characters is required" });
  }

  if (!user.email || user.email.length < 4) {
    return res.status(400).json({ message: "Email is required of at least four characters" });
  }
  if (!user.professor_id) {
    return res.status(400).json({ message: "Professor ID is required." });
  }
  const validateResult = validateUser(user);

  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    
    const token = generateToken(user);
    Students.add(user)
      .then(saved => {
        if (user.username && user.lastname && user.firstname && user.password && user.email && user.professor_id) {
          res.status(201).json({token: token,
            message: `Welcome ${user.firstname}!`, ...user, token });
        } else {
          res
            .status(404)
            .json({ message: "Missing info. User requires a username, lastname, firstname, password, email, and professor id" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Registration error." });
      });
  } else {
    res.status(400).json({
      message: "Invalid user info",
      errors: validateResult.errors
    });
  }
});

//LOGIN PROFESSOR

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome Professor ${user.lastname}!`, ...user, token });
      } else {
        res.status(401).json({ error: "Invalid login credentials, please re-enter username and password to continue" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Login error." });
    });
});

// LOGIN STUDENT 

router.post("/login/students", (req, res) => {
  let { username, password, professor_id } = req.body;
  Students.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password) && (professor_id, user.professor_id)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.firstname}!`,
         ...user, token });
      } else {
        res.status(401).json({ error: "Invalid login credentials, please re-enter username, password and professor ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Login error." });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ err: "Could not log out" });
      } else {
        res
          .status(200)
          .json({ message: "You are logged out." });
      }
    });
  } else {
    res
      .status(200)
      .json({
        message: "Logout success. For your security, please close this window."
      });
  }
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    user: user.password,
    role: user.role || 'user',
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;




router.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }
  Users.findBy({ username })
    .first()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          errorMessage: "username does not exist"
        });
      } else {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
            ...user
          });
        }
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ errorMessage: "error logging in" });
    });
});