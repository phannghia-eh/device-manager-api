const router = require('express').Router()
const TestController = require('./test.controller')

router.route('/')
  .get(TestController.hello)

module.exports = router