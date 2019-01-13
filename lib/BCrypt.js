const bcrypt = require('bcrypt')
class BCrypt{
  static generate(plaintext, saltRounds = 10){
    return new Promise((resolve, reject) => {
      bcrypt.hash(plaintext, saltRounds, (err, data) => err ? reject(err) : resolve(data))
    })
  }
  static compare(plaintext, hash){
    return new Promise((resolve, reject) => {
      bcrypt.compare(plaintext, hash, (err, result) => err ? reject(err) : resolve(result))
    })
  }
}

module.exports = BCrypt
