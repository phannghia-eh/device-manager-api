const JWToken = require('../../lib/JWToken')
const AccountService = require('../../apiCore/auth/auth.service')

class V1Middleware {
  static async requireAuthenticate(req, res, next) {
    try {
      let token = req.headers['authorization'] || req.query.access_token

      if (!token) return next(new global.ApiException(global.ErrorCode.token_absent))
      let decoded = await JWToken.verify(token)

      let account = await AccountService.getAccountById(decoded.data._id)
      if (account.state !== 'active') return next(new global.ApiException(global.ErrorCode.account_disabled))
      let hash = global.Utilities.createSig({_id: account._id, pwd: account.password})
      if (decoded.data.hash !== hash) return next(new global.ApiException(global.ErrorCode.session_changed))

      req.user = account
      req.user.isAdmin = account.role === 'admin'
      delete req.user.password
      return next()
    } catch (e) {
      if (e.name === 'TokenExpiredError') return next(new global.ApiException(global.ErrorCode.token_expired, e))
      return next(e)
    }
  }
  static parsePaginate(req, res, next) {
    let {f, q, limit, page} = req.query

    limit = parseInt(limit) || 50
    page = parseInt(page) || 1

    req.paging = {
      f: f,
      q: q,
      limit: limit,
      page: page,
      skip: (page - 1) * limit,
    }

    return next()
  }
  static requireAdmin(req, res, next) {
    if (!req.user.isAdmin) return next(new global.ApiException(global.ErrorCode.do_not_have_role))
    return next()

  }
  static preventSQLInjection(req, res, next) {
    return next()
  }
}

module.exports = V1Middleware
