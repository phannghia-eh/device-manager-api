const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  displayName: {
    type: String,
    default: 'Hihi',
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: 'active', // inactive, blocked
  },
  role: {
    type: String,
    default: 'user', // admin
  },
  attemptFailed: {
    type: Number,
    default: 0,
  },
}, {timestamps: true})

AuthSchema.pre('save', function(next) {
  let now = Date.now()
  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }
  next()
})

const AuthModel = mongoose.model(`${global.config.database_prefix ? global.config.database_prefix + '_' : ''}account`, AuthSchema)

module.exports = AuthModel
