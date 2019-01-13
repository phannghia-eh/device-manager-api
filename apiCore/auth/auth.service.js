const BCrypt = require('../../lib/BCrypt')
const JWToken = require('../../lib/JWToken')
const Account = require('./auth.model')

class AccountService {
  static getAccountById(account_id){
    return Account.findById(
      account_id,
      {
        __v: 0,
      },
      {
        lean: 1,
      }
    )
  }
  static async createAccount(username, password){
    const hash = await BCrypt.generate(password, 10)
    return new Account({
      username: username,
      password: hash,
    }).save()
  }
  static authenticate(username, password){
    return new Promise(async(resolve, reject) => {
      try {
        const account = await Account.findOne({username: username}, {__v: 0}, {lean: 1})
        if (!account) return reject(new global.ApiException(global.ErrorCode.login_failed))
        switch (account.state) {
          case 'inactive':
            return reject(new global.ApiException(global.ErrorCode.account_inactive))
          case 'blocked':
            return reject(new global.ApiException(global.ErrorCode.account_blocked))
          default:
            let isMatch = await BCrypt.compare(password, account.password)
            if (!isMatch) return reject(new global.ApiException(global.ErrorCode.login_failed))
            let token = JWToken.create({
              username: account.username,
              _id: account._id,
              hash: global.Utilities.createSig({_id: account._id, pwd: account.password}),
            })
            return resolve({accessToken: token, _id: account._id})
        }
      } catch (e) {
        return reject(e)
      }

    })
  }
}

module.exports = AccountService
