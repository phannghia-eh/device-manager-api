class TestController {
  static hello(req,res,next) {
    next(new global.ApiResponseObject({code: 100, message:'Hello'}))
  }
}

module.exports = TestController