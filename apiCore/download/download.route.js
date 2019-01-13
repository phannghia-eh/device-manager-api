const router = require('express').Router()
const DownloadController = require('./download.controller')

router.route('/:platform')
  .get(DownloadController.getLatestVersion)
module.exports = router
