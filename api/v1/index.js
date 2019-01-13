const router = require('express').Router()

require('../../lib/autoload')(__dirname, router)
router.use((errorOrResult, req, res, next) => {
  switch (errorOrResult.constructor){
    case global.ApiException:
      return res.status(errorOrResult.httpCode).json(errorOrResult.innerData)
    case global.ApiResponseMessage:
    case global.ApiResponseObject:
      return res.status(200).json(errorOrResult.innerData)
    case global.ApiResponseArray:
      return res.status(errorOrResult.httpCode).json(errorOrResult.innerData)
    default:
      return res.status(500).json({
        code: 100,
        description: errorOrResult.message,
        detail: errorOrResult,
      })
  }
})

router.use((req, res, next) => {
  res.status(404)
    .json({
      code: 999,
      description: 'API endpoint is not found.',
    })
})
module.exports = router
