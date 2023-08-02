'use strict'

const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// 首頁(根目錄)路由
router.get('/', (req, res) => {
  const UserId = req.user.id

  Todo.findAll({ where: { UserId }, raw: true, nest: true })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router