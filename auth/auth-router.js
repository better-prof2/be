const bcrypt = require('bcrypt')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config/secrets')