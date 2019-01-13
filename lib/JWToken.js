const jwt = require('jsonwebtoken')

class JWToken{
  static create(object){
    let payload = {
      data: object,
    }
    let token = jwt.sign(
      payload,
      global.config.jwt_secret_key,
      {
        expiresIn: 864000,
      }
    )
    return token
  }
  static verify(token){
    return jwt.verify(token, global.config.jwt_secret_key)
  }
}
module.exports = JWToken
