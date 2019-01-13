const router = require('express').Router()
const AuthController = require('./auth.controller')

router.route('/login')
  .post(AuthController.login)
router.route('/register')
  .post(AuthController.register)
router.use((errorOrResult, req, res, next) => {
  switch (errorOrResult.constructor){
    case global.ApiException:
      return res.status(errorOrResult.httpCode).json(errorOrResult.innerData)
    case global.ApiResponseMessage:
    case global.ApiResponseObject:
    case global.ApiResponseArray:
      return res.status(errorOrResult.httpCode).json(errorOrResult.innerData)
    default:
      return res.status(400)
        .json({
          code: 100,
          description: 'Some strange error occurred. See detail for more information.',
          detail: errorOrResult,
        })
  }
})

module.exports = router

