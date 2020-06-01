//Creating Express server
const express = require('express')
const server = express()
// Importing Middleware
const cors = require('cors')
const helmet = require('helmet')
const logger = require('../middleware/logger')
const authenticate = require("../auth/auth-mid")


// Env 
const dotenv = require('dotenv')
dotenv.config()

// Importing server routers 
const authRouter = require("../auth/auth-router")
const usersRouter = require('../users/users-router')
const studentsRouter = require("../students/students-router")
const projectsRouter = require("../projects/projects-router")
const messagesRouter = require("../messages/messages-router")

// middleware
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(logger)

server.use("/api/auth", authRouter)
server.use("/api/users", authenticate, usersRouter)
server.use("api/students", studentsRouter)
server.use("/api/projects", projectsRouter)
server.use("/api/messages", messagesRouter)

server.get('/', (req, res) => {
    res.json({
        message: "Better Professor App"
    })
})



module.exports = server;