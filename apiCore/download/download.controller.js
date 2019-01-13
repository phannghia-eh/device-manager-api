const path = require('path')
const DownloadService = require('./download.service')
class DownloadController {
  static getLatestVersion(req, res, next) {
    let {platform} = req.params
    let filesDir = path.resolve(global.projectPath, 'upload', platform)
    let filename = DownloadService.getLatestFile(filesDir)
    res.download(path.resolve(filesDir, filename), filename)
  }
}

module.exports = DownloadController
