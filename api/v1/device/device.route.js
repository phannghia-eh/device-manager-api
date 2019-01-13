const router = require('express').Router()
const DeviceController = require('./device.controller')

router.route('/')
  .get(DeviceController.findAllDevice)
  .post(DeviceController.addDevice)

router.route('/:deviceId')
  .put(DeviceController.updateDeviceById)

module.exports = router