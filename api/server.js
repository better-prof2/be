//Creating Express server
const express = require('express')
const server = express()
// Importing Middleware
const cors = require('cors')
const helmet = require('helmet')
const logger = require('../middleware/logger')


// Env 
const dotenv = require('dotenv')
dotenv.config()

// Importing server routers 

// middleware
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(logger)

server.get('/', (req, res, next) => {
    res.json({
        message: "Better Professor App"
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Error"
    })
})


module.exports = server