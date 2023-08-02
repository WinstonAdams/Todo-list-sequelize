'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../../models')
const User = db.User

router.get('/login', (req, res) => {
  const email = req.flash('email')
  const password = req.flash('password')

  res.render('login', { email, password })
})

router.post('/login', (req, res, next) => {
  req.flash('email', req.body.email)
  req.flash('password', req.body.password)
  next()
},
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  }))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  // 若 errors 陣列中有元素時
  if (errors.length) {
    // errors 傳給 register，再傳給 message
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router