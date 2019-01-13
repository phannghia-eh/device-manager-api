const fs = require('fs')

class DownloadService {
  static getLatestFile(pathName) {
    let files = fs.readdirSync(pathName)
    files = files.filter(file => {
      return file.endsWith('.exe')
    })
    files = files.sort()
    if (files.length === 0) return null
    return files[files.length - 1]
  }
}

module.exports = DownloadService
