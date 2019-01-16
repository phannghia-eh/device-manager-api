const DeviceService = require('../../../core/device/device.service')

class DeviceController {
  static async findAllDevice(req, res, next) {
    try {
      const result = await DeviceService.findAll()
      next(new global.ApiResponseObject({data: result, message: 'Find all device success'}))
    } catch (error) {
      next(new global.ApiException(global.ErrorCode.unknown_error))
    }
  }

  static async updateDeviceById(req, res, next) {
    try {
      const {device} = req.body;
      const result = await DeviceService.update(device)
      next(new global.ApiResponseObject({data: result, message: 'Update device success'}))
    } catch (err) {
      next(new global.ApiException(global.ErrorCode.unknown_error))
    }
  }

  static async addDevice(req, res, next) {
    try {
      const {device} = req.body;
      const result = await DeviceService.create(device)
      next(new global.ApiResponseObject({data: result, message: 'Update device success'}))
    } catch (err) {
      if (err.code === 11000)
        next(new global.ApiException(global.ErrorCode.create_device_failed_by_id))
      else
        next(global.ApiException.ErrorCode.unknown_error)
    }
  }

  static async importDevices(req, res, next) {
    try {
      let success = [], fail = [], result = {}
      const listDevices = req.body.devices

      for (let device of listDevices) {
        try {
          const result = await DeviceService.create(device)
          if (result)
            success.push(device)
        } catch (err) {
          if (err.code === 11000)
            fail.push(device)
        }
      }

      result.success = success
      result.fail = fail

      next(new global.ApiResponseObject({data: result, message: 'Import Done'}))
    } catch (err) {
      next(global.ApiException.ErrorCode.unknown_error)
    }
  }
}

module.exports = DeviceController