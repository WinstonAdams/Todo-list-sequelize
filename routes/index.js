'use strict'

const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')

router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)
router.use('/auth', auth)

module.exports = router