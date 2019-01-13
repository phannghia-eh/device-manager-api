const mongoose = require('mongoose')

class MongoDB {
  static openDatabase(connectString = null, callback){
    let database_options = {
    }
    mongoose.connect(connectString, database_options, err => {
      if (err) throw Error('Open database failed')
      console.log('Database is opening')
      if (callback) return callback()
    })
  }
}
module.exports = MongoDB
