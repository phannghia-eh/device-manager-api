const AccountService = require('./auth.service')
class AuthController {
  static register(req, res, next){
    let {username, password} = req.body
    if (!username || !password) return next(new global.ApiException(global.ErrorCode.register_input_malformed))
    username = username.toString()
    password = password.toString()
    AccountService.createAccount(username, password)
      .then(account => next(new global.ApiResponseObject({_id: account._id}, 201)))
      .catch(error => next(new global.ApiException(global.ErrorCode.register_failed, error)))
  }
  static login(req, res, next){
    let {username, password} = req.body
    if (!username || !password) return next(new global.ApiException(global.ErrorCode.register_input_malformed))
    username = username.toString()
    password = password.toString()

    AccountService.authenticate(username, password)
      .then(data => next(new global.ApiResponseObject(data)))
      .catch(error => next(error))

  }
}
module.exports = AuthController
