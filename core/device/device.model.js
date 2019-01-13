const mongoose = require('mongoose')

const DeviceSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name:{
    type: String
  },
  type: {
    type: Number,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  department: {
    type: String
  },
  assignment: {
    type: String
  },
  note: {
    type: String
  },
  importedAt: {
    type: Date
  },
  lastUpdate: {
    type: Date
  }
}, {minimize: false})

DeviceSchema.pre('save', next => {
  let now = Date.now()
  this.lastUpdate = now
  if (!this.createdAt) {
    this.createdAt = now
  }
  next()
})

const deviceModel = mongoose.model('device', DeviceSchema)

module.exports = deviceModel