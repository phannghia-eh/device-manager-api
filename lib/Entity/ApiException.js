const HttpCode = {
  OK: 200,
  Created: 201,
  Accepted: 202,
  MovedPermanently: 301,
  Found: 302,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequire: 407,
  RequestTimeout: 408,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GaywayTimeout: 504,
}
const ErrorCode = {
  unknown_error: [100, 'Unknown Error. Please contact administrator for more information', HttpCode.InternalServerError],
  // 100 -> 199. Error about authentication
  register_failed: [101, 'Register failed', HttpCode.BadRequest],
  login_failed: [102, 'Account or password is incorrect', HttpCode.BadRequest],
  session_expired: [103, 'Session was expired or user change session. Please login', HttpCode.Unauthorized],
  do_not_have_role: [104, 'You do not have role for this action', HttpCode.Forbidden],
  register_input_malformed: [105, 'Username or password is empty.', HttpCode.BadRequest],
  token_absent: [106, 'This route require an access token', HttpCode.Forbidden],
  session_changed: [107, 'Session changed. Please do login again', HttpCode.Forbidden],
  token_expired: [108, 'Token was expired. Please do login again', HttpCode.Unauthorized],
  account_disabled: [109, 'This account has been disabled', HttpCode.Unauthorized],
  // 200 -> 299 device error
  update_device_failed: [200, 'Can not update device', HttpCode.BadRequest],
  create_device_failed_by_id: [201, 'Device duplicate id', HttpCode.BadRequest],
}

class ApiException {
  constructor(code = [], error, httpCode) {
    this.code = code[0]
    this.message = code[1]
    this.error = error
    this.httpCode = httpCode || code[2] || 400
  }
  get innerData() {
    return {
      code: this.code,
      description: this.message,
      detail: this.error,
    }
  }
}

module.exports = {
  ErrorCode: ErrorCode,
  ApiException: ApiException,
}
