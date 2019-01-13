const Device = require('./device.model')

class DeviceService {
  static async findAll() {
    return new Promise((resolve, reject) => {
      Device.find({}, {
          __v: 0,
          _id: 0,
        },
        {
          lean: 1,
        },
        (err, rls) => {
          if (err)
            return reject(err)
          return resolve(rls)
        })
    })
  }

  static async update(device) {
    return new Promise((resolve, reject) => {
      Device.findOne({id: device.id}, (err, oldDevice) => {
        if (oldDevice) {
          oldDevice.set(device)
          oldDevice.save((err, updated) => {
            if (err) return reject(err)
            return resolve(updated)
          })
        } else
          return reject({message: 'Device not found'})
      })
    })
  }

  static async create(device) {
    return new Promise((resolve, reject) => {
      const newDevice = new Device(device)
      newDevice.save((err, rls) => {
        if (err) return reject(err)
        return resolve(rls)
      })
    })
  }
}

module.exports = DeviceService